import { ConversationDto } from "./ConversationDto"
import { UserDto, UserTypeEnum } from "./UserDto"

export enum MessageTypeEnum {
  QUOTE_OFFER = "quote_offer",
  REJECT_QUOTE_MESSAGE = "reject_quote_message",
  ACCEPT_QUOTE_MESSAGE = "accept_quote_message",
  STANDARD_MESSAGE = "standard_message",
  IMAGE = "image",
  DOCUMENT = "document",
}

export type MessageDto = {
  _id: string
  conversation_id: ConversationDto
  message_type: MessageTypeEnum
  text: string
  sender_type: UserTypeEnum
  read_at?: Date
  created_at: Date
  updated_at: Date
  sender_id: UserDto
}

