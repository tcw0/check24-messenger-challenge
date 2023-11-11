import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import { Request } from "express"
import { MessageService } from "../models/MessageModel"
import { ConversationService } from "../models/ConversationModel"
import { UserService } from "../models/UserModel"

interface User {
  id: string
}

export const getUnreadById = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    try {
      const unreadMessagesCount = await MessageService.countDocuments({
        conversation_id: conversationId,
        read_at: { $exists: false },
        sender_id: { $ne: (req.user as User).id },
      })

      res.send(unreadMessagesCount)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const getMessagesByConversationId = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Invalid data passed to request")
    }

    try {
      const messages = await MessageService.find({
        conversation_id: conversationId,
      }).populate("sender_id", "name picture")

      res.status(200).json(messages)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const postMessage = asyncHandler(async (req, res) => {
  const { conversationId, text, messageType } = req.body

  if (!conversationId || !text || !messageType) {
    res.status(400).send()
    throw new Error("Invalid data passed to request")
  }

  const conversation = await ConversationService.findById(conversationId)
  if (!conversation) {
    res.status(400).send()
    throw new Error("Conversation not found")
  }

  const sender = await UserService.findById((req.user as User).id)
  if (!sender) {
    res.status(400).send()
    throw new Error("Sender not found")
  }

  try {
    let newMessage = await MessageService.create({
      conversation_id: conversation._id,
      message_type: messageType,
      text: text,
      sender_type: sender.user_type,
      created_at: new Date(),
      updated_at: new Date(),
      sender_id: sender._id,
    })

    if (!newMessage) {
      res.status(400).send()
      throw new Error("Error creating new message")
    }

    newMessage = await newMessage.populate("sender_id", "name picture")

    await ConversationService.findByIdAndUpdate(conversation._id, {
      latest_message: newMessage,
      updated_at: new Date(),
    })

    res.status(200).json(newMessage)
  } catch (error) {
    res.status(400).send()
    console.log(error)
  }
})
