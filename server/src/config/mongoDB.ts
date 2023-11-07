import { connect } from "mongoose"

const connectDB = async (): Promise<void> => {
  if (process.env.MONGODB_MODE === "LOCAL") {
    const conn = await connect(process.env.MONGODB_URI_LOCAL as string)
    console.info(`Connected to MongoDB local database: ${conn.connection.host}`)
  } else if (process.env.MONGODB_MODE === "REMOTE") {
    const conn = await connect(process.env.MONGODB_URI_REMOTE as string)
    console.info(
      `Connected to MongoDB remote database: ${conn.connection.host}`
    )
  }
}

export default connectDB
