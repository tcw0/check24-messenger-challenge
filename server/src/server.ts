import express, { Request, Response } from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongoDB"
import userRouter from "./routes/userRouter"
import conversationRouter from "./routes/conversationRouter"
import { errorHandler, notFound } from "./middleware/errorHandler"
import messageRouter from "./routes/messageRouter"
import { Socket } from "socket.io"

dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.use("/api/", [userRouter()])
app.use("/api/", [conversationRouter()])
app.use("/api/", [messageRouter()])

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})

// eslint-disable-next-line
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", (socket: Socket) => {
  console.log("Connected to socket.io")
  socket.on("setup", (userId) => {
    socket.join(userId)
    console.log(userId, "joined")
    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User Joined Room: " + room)
  })

  socket.on("new message", (newMessageRecieved) => {
    console.log("new message recieved", newMessageRecieved)
    const conversation = newMessageRecieved.conversation_id

    console.log("conversation", conversation)
    if (!conversation.customer_id || !conversation.service_provider_id)
      return console.log(
        "conversation.customer_id or conversation.service_provider_id not defined"
      )

    console.log("conversation.customer_id._id", conversation.customer_id._id)
    console.log(
      "newMessageRecieved.sender_id._id",
      newMessageRecieved.sender_id._id
    )

    if (conversation.customer_id._id == newMessageRecieved.sender_id._id) {
      console.log("emitting to service provider")
      socket
        .in(conversation.service_provider_id._id)
        .emit("message received", newMessageRecieved)
    } else {
      console.log("emitting to customer")
      socket
        .in(conversation.customer_id._id)
        .emit("message received", newMessageRecieved)
    }
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"))
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))
})
