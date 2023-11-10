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
  //   const [notification, setNotification] = React.useState([])
  const [conversations, setConversations] = React.useState<ConversationDto[]>(
    []
  )

  const value = React.useMemo(() => {
    return {
      selectedConversation,
      setSelectedConversation,
      //   notification,
      //   setNotification,
      conversations,
      setConversations,
    }
  }, [
    selectedConversation,
    setSelectedConversation,
    // notification,
    // setNotification,
    conversations,
    setConversations,
  ])

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}
