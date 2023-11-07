import { model, Schema, Document } from "mongoose"

export enum ConversationStateEnum {
  QUOTED = "quoted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface ConversationDocument extends Document {
  customer_name: string
  service_provider_name: string
  state: ConversationStateEnum
  created_at: Date
  updated_at: Date
  deleted_at: Date
  latest_message: string
  customer_id: string
  service_provider_id: string
}

const ConversationSchema = new Schema({
  customer_name: { type: String, required: true },
  service_provider_name: { type: String, required: true },
  state: {
    type: Schema.Types.String,
    enum: Object.values(ConversationStateEnum),
    required: true,
  },
  created_at: { type: Schema.Types.Date, required: true },
  updated_at: { type: Schema.Types.Date, required: true },
  deleted_at: { type: Schema.Types.Date, required: false },
  latest_message: { type: Schema.Types.ObjectId, ref: "Message" },
  customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service_provider_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

export const ConversationService = model("Conversation", ConversationSchema)
