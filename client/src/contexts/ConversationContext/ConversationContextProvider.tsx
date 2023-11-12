import React from "react"
import { ConversationContext } from "./ConversationContext"
import { ConversationDto } from "../../types/ConversationDto"

export function ConversationContextProvider(props: {
  children: React.ReactNode
}) {
  const { children } = props

  const [selectedConversation, setSelectedConversation] = React.useState<
    ConversationDto | undefined
  >()
  const [conversations, setConversations] = React.useState<ConversationDto[]>(
    []
  )
  const [fetchConversations, setFetchConversations] = React.useState(false)

  const value = React.useMemo(() => {
    return {
      selectedConversation,
      setSelectedConversation,
      conversations,
      setConversations,
      fetchConversations,
      setFetchConversations,
    }
  }, [selectedConversation, conversations, fetchConversations])

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}
