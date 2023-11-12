import React from "react"
import { ConversationDto } from "../../types/ConversationDto"

type ConversationContextType = {
  selectedConversation: ConversationDto | undefined
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationDto | undefined>
  >
  conversations: ConversationDto[]
  setConversations: React.Dispatch<React.SetStateAction<ConversationDto[]>>
  fetchConversations: boolean
  setFetchConversations: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConversationContext = React.createContext<ConversationContextType>(
  {
    selectedConversation: undefined,
    setSelectedConversation: () => {},
    conversations: [],
    setConversations: () => {},
    fetchConversations: false,
    setFetchConversations: () => {},
  }
)
