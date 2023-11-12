import React from "react"
import { ConversationDto } from "../../types/ConversationDto"
import { MessageDto } from "../../types/MessageDto"

type ConversationContextType = {
  selectedConversation: ConversationDto | undefined
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationDto | undefined>
  >
  notification: MessageDto[]
  setNotification: React.Dispatch<React.SetStateAction<MessageDto[]>>
  conversations: ConversationDto[]
  setConversations: React.Dispatch<React.SetStateAction<ConversationDto[]>>
  fetchConversations: boolean
  setFetchConversations: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConversationContext = React.createContext<ConversationContextType>(
  {
    selectedConversation: undefined,
    setSelectedConversation: () => {},
    notification: [],
    setNotification: () => {},
    conversations: [],
    setConversations: () => {},
    fetchConversations: false,
    setFetchConversations: () => {},
  }
)
