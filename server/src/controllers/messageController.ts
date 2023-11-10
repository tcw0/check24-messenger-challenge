import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import { Request } from "express"
import { MessageService } from "src/models/MessageModel"

export const getUnreadById = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    try {
      const unreadMessagesCount = await MessageService.countDocuments({
        conversation_id: conversationId,
        read_at: { $exists: false },
      })

      res.send(unreadMessagesCount)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)
