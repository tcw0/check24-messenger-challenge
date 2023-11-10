import React from "react"
import { ConversationDto } from "../../types/ConversationDto"

type ConversationContextType = {
  selectedConversation: ConversationDto | undefined
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationDto | undefined>
  >
  // notification:
  // setNotification:
  conversations: ConversationDto[]
  setConversations: React.Dispatch<React.SetStateAction<ConversationDto[]>>
}

export const ConversationContext = React.createContext<ConversationContextType>(
  {
    selectedConversation: undefined,
    setSelectedConversation: () => {},
    // notification:
    // setNotification:
    conversations: [],
    setConversations: () => {},
  }
)
