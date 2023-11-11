/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from "express-async-handler"
import {
  ConversationService,
  ConversationStateEnum,
} from "../models/ConversationModel"
import { UserService } from "../models/UserModel"
import { MessageService } from "../models/MessageModel"

interface User {
  id: string
}

export const getConversations = asyncHandler(async (req, res) => {
  try {
    const conversations = await ConversationService.find({
      $or: [
        { customer_id: (req.user as User).id },
        { service_provider_id: (req.user as User).id },
      ],
    })
      .populate("customer_id", "-password")
      .populate("service_provider_id", "-password")
      .populate("latest_message")
      .sort({ updated_at: -1 })

    const conversationsWithUnreadCount = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadMessagesCount = await MessageService.countDocuments({
          conversation_id: conversation._id,
          read_at: { $exists: false },
          sender_id: { $ne: (req.user as User).id },
        })
        return {
          ...conversation.toObject(),
          unreadMessagesCount,
        }
      })
    )

    res.send(conversationsWithUnreadCount)
    // res.send(conversations)
  } catch (error) {
    res.status(400).send()
    console.log(error)
  }
})

export const postConversation = asyncHandler(async (req, res) => {
  console.log("Creating new conversation")
  const { userId } = req.body

  if (!userId) {
    console.log("UserId param not sent with request")
    res.status(400).send()
  }

  const customer = await UserService.findById((req.user as User).id)
  const service_provider = await UserService.findById(userId)

  if (!customer || !service_provider) {
    res.status(400).send()
    throw new Error("Customer or Service Provider not found")
  }

  try {
    const newConversation = await ConversationService.create({
      customer_name: customer.name,
      service_provider_name: service_provider.name,
      state: ConversationStateEnum.QUOTED,
      created_at: Date(),
      updated_at: Date(),
      customer_id: customer._id,
      service_provider_id: service_provider._id,
    })

    if (!newConversation) {
      res.status(400).send()
      throw new Error("Error creating new conversation.")
    }

    res.status(200).json({
      id: newConversation._id,
    })
  } catch (error) {
    res.status(400).send()
    console.log(error)
  }
})
