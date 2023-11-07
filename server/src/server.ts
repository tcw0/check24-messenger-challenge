import express, { Request, Response } from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongoDB"

connectDB()
const app = express()
dotenv.config()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
