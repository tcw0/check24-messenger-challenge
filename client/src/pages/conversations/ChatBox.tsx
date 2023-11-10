import React from "react"
import { ConversationContext } from "../../contexts/ChatContext/ConversationContext"
import { Stack, Typography } from "@mui/material"
import NoChat from "../../components/NoChat"

const ChatBox = () => {
  const conversationContext = React.useContext(ConversationContext)

  return (
    <>
      {conversationContext.selectedConversation ? (
        <>
          <Typography>Chat</Typography>
        </>
      ) : (
        <Stack
          spacing={2}
          sx={{ height: "100%", width: "100%" }}
          alignItems="center"
          justifyContent={"center"}
        >
          <NoChat />
          <Typography variant="subtitle2">
            Select a conversation or start a new one
          </Typography>
        </Stack>
      )}
    </>
  )
}

export default ChatBox
