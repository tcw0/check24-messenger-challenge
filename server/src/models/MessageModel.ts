import { model, Schema } from "mongoose"

export enum MessageTypeEnum {
  QUOTEOFFER = "quote_offer",
  REJECTQUOTEMESSAGE = "reject_quote_message",
  ACCEPTQUOTEMESSAGE = "accept_quote_message",
  STANDARDMESSAGE = "standard_message",
}

export enum SenderTypeEnum {
  CUSTOMER = "customer",
  SERVICEPROVIDER = "service_provider",
}

const MessageSchema = new Schema({
  conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
  message_type: {
    type: Schema.Types.String,
    enum: Object.values(MessageTypeEnum),
    required: true,
  },
  text: { type: String, required: true },
  sender_type: {
    type: Schema.Types.String,
    enum: Object.values(SenderTypeEnum),
    required: true,
  },
  read_at: { type: Schema.Types.Date, required: false },
  created_at: { type: Schema.Types.Date, required: true },
  updated_at: { type: Schema.Types.Date, required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "User" },
})

export const MessageService = model("Message", MessageSchema)
