/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from "express-async-handler"
import {
  ConversationService,
  ConversationStateEnum,
} from "../models/ConversationModel"
import { UserService, UserTypeEnum } from "../models/UserModel"
import { MessageService, MessageTypeEnum } from "../models/MessageModel"
import { Request } from "express"
import mongoose from "mongoose"

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

export const acceptConversation = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Missing conversation id")
    }

    try {
      const conversation = await ConversationService.findOne({
        _id: conversationId,
        state: ConversationStateEnum.QUOTED,
      })

      if (!conversation) {
        res.status(400).send()
        throw new Error(
          `Conversation ${conversationId} is not in QUOTED state. Cannot accept.`
        )
      }

      await ConversationService.updateOne(
        { _id: conversationId },
        { $set: { state: ConversationStateEnum.ACCEPTED } }
      )

      let acceptedMessage = await MessageService.create({
        conversation_id: conversationId,
        message_type: MessageTypeEnum.ACCEPT_QUOTE_MESSAGE,
        text: "Quote accepted",
        sender_type: UserTypeEnum.CUSTOMER,
        created_at: Date(),
        updated_at: Date(),
        sender_id: (req.user as User).id,
      })

      if (!acceptedMessage) {
        res.status(400).send()
        throw new Error("Error creating new message")
      }

      acceptedMessage = await acceptedMessage.populate(
        "sender_id",
        "name picture"
      )
      acceptedMessage = await acceptedMessage.populate("conversation_id")
      await UserService.populate(acceptedMessage, {
        path: "conversation_id.service_provider_id",
        select: "name picture email",
      })
      await UserService.populate(acceptedMessage, {
        path: "conversation_id.customer_id",
        select: "name picture email",
      })

      await ConversationService.findByIdAndUpdate(conversation._id, {
        latest_message: acceptedMessage,
        updated_at: new Date(),
      })

      res.send(acceptedMessage)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const rejectConversation = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Missing conversation id")
    }

    try {
      const conversation = await ConversationService.findOne({
        _id: conversationId,
        state: ConversationStateEnum.QUOTED,
      })

      if (!conversation) {
        res.status(400).send()
        throw new Error(
          `Conversation ${conversationId} is not in QUOTED state. Cannot accept.`
        )
      }

      await ConversationService.updateOne(
        { _id: conversationId },
        { $set: { state: ConversationStateEnum.REJECTED } }
      )

      let rejectedMessage = await MessageService.create({
        conversation_id: conversationId,
        message_type: MessageTypeEnum.REJECT_QUOTE_MESSAGE,
        text: "Quote rejected",
        sender_type: UserTypeEnum.CUSTOMER,
        created_at: Date(),
        updated_at: Date(),
        sender_id: (req.user as User).id,
      })

      if (!rejectedMessage) {
        res.status(400).send()
        throw new Error("Error creating new message")
      }

      rejectedMessage = await rejectedMessage.populate(
        "sender_id",
        "name picture"
      )
      rejectedMessage = await rejectedMessage.populate("conversation_id")
      await UserService.populate(rejectedMessage, {
        path: "conversation_id.service_provider_id",
        select: "name picture email",
      })
      await UserService.populate(rejectedMessage, {
        path: "conversation_id.customer_id",
        select: "name picture email",
      })

      await ConversationService.findByIdAndUpdate(conversation._id, {
        latest_message: rejectedMessage,
        updated_at: new Date(),
      })

      res.send(rejectedMessage)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const completeConversation = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Missing conversation id")
    }

    try {
      const conversation = await ConversationService.findOne({
        _id: conversationId,
        state: ConversationStateEnum.ACCEPTED,
      })

      if (!conversation) {
        res.status(400).send()
        throw new Error(
          `Conversation ${conversationId} is not in ACCEPTED state. Cannot accept.`
        )
      }

      await ConversationService.updateOne(
        { _id: conversationId },
        { $set: { state: ConversationStateEnum.COMPLETED } }
      )

      let completedMessage = await MessageService.create({
        conversation_id: conversationId,
        message_type: MessageTypeEnum.COMPLETED_MESSAGE,
        text: "Conversation completed. Please review the service provider.",
        sender_type: UserTypeEnum.CUSTOMER,
        created_at: Date(),
        updated_at: Date(),
        sender_id: (req.user as User).id,
      })

      if (!completedMessage) {
        res.status(400).send()
        throw new Error("Error creating new message")
      }

      completedMessage = await completedMessage.populate(
        "sender_id",
        "name picture"
      )
      completedMessage = await completedMessage.populate("conversation_id")
      await UserService.populate(completedMessage, {
        path: "conversation_id.service_provider_id",
        select: "name picture email",
      })
      await UserService.populate(completedMessage, {
        path: "conversation_id.customer_id",
        select: "name picture email",
      })

      await ConversationService.findByIdAndUpdate(conversation._id, {
        latest_message: completedMessage,
        updated_at: new Date(),
      })

      res.send(completedMessage)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const reviewConversation = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params
    const { rating } = req.body

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Missing conversation id")
    }

    try {
      const conversation = await ConversationService.findOne({
        _id: conversationId,
        state: ConversationStateEnum.COMPLETED,
      })

      if (!conversation) {
        res.status(400).send()
        throw new Error(
          `Conversation ${conversationId} is not in COMPLETED state. Cannot accept.`
        )
      }

      await UserService.findByIdAndUpdate(conversation.service_provider_id, {
        $push: { ratings: rating },
      })

      await ConversationService.updateOne(
        { _id: conversationId },
        { $set: { state: ConversationStateEnum.REVIEWED } }
      )

      let reviewedMessage = await MessageService.create({
        conversation_id: conversationId,
        message_type: MessageTypeEnum.REVIEWED_MESSAGE,
        text: "Finalized review: " + rating + " stars",
        sender_type: UserTypeEnum.CUSTOMER,
        created_at: Date(),
        updated_at: Date(),
        sender_id: (req.user as User).id,
      })

      if (!reviewedMessage) {
        res.status(400).send()
        throw new Error("Error creating new message")
      }

      reviewedMessage = await reviewedMessage.populate(
        "sender_id",
        "name picture"
      )
      reviewedMessage = await reviewedMessage.populate("conversation_id")
      await UserService.populate(reviewedMessage, {
        path: "conversation_id.service_provider_id",
        select: "name picture email",
      })
      await UserService.populate(reviewedMessage, {
        path: "conversation_id.customer_id",
        select: "name picture email",
      })

      await ConversationService.findByIdAndUpdate(conversation._id, {
        latest_message: reviewedMessage,
        updated_at: new Date(),
      })

      res.send(reviewedMessage)
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)

export const deleteConversation = asyncHandler(
  async (req: Request<{ conversationId: mongoose.Types.ObjectId }>, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
      res.status(400).send()
      throw new Error("Missing conversation id")
    }

    try {
      const conversation = await ConversationService.findById(conversationId)

      if (!conversation) {
        res.status(400).send()
        throw new Error(`Conversation not found`)
      }

      if (!conversation.deleted_at) {
        conversation.deleted_at = new Date()

        await conversation.save()

        res.send(conversation)
      } else {
        res.status(400).send()
        throw new Error("Conversation already deleted")
      }
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
)
