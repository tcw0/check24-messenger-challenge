export enum ConversationStateEnum {
  QUOTED = "quoted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type ConversationDto = {
  id: string
  customer_name: string
  service_provider_name: string
  state: ConversationStateEnum
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  latest_message?: string
  customer_id: string
  service_provider_id: string
}
