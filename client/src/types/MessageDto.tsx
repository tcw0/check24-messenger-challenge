export enum MessageTypeEnum {
  QUOTE_OFFER = "quote_offer",
  REJECT_QUOTE_MESSAGE = "reject_quote_message",
  ACCEPT_QUOTE_MESSAGE = "accept_quote_message",
  STANDARD_MESSAGE = "standard_message",
}

export enum SenderTypeEnum {
  CUSTOMER = "customer",
  SERVICEPROVIDER = "service_provider",
}

export type MessageDto = {
  conversation_id: string
  message_type: MessageTypeEnum
  text: string
  sender_type: SenderTypeEnum
  read_at?: Date
  created_at: Date
  updated_at: Date
  sender_id: string
}

