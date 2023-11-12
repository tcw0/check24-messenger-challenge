import { MessageDto } from "./MessageDto"
import { UserDto } from "./UserDto"

export enum ConversationStateEnum {
  QUOTED = "quoted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed",
  REVIEWED = "reviewed",
}

export type ConversationDto = {
  _id: string
  customer_name: string
  service_provider_name: string
  state: ConversationStateEnum
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  latest_message?: MessageDto
  customer_id: UserDto
  service_provider_id: UserDto
  unreadMessagesCount: number
}
