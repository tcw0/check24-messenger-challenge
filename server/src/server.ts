import express, { Request, Response } from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongoDB"
import userRouter from "./routes/userRouter"
import conversationRouter from "./routes/conversationRouter"
import { errorHandler, notFound } from "./middleware/errorHandler"

dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

app.use("/api/", [userRouter()])
app.use("/api/", [conversationRouter()])

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
