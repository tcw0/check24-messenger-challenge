import React from "react"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { Stack, Typography, Box } from "@mui/material"
import NoChat from "../../components/NoChat"
import ChatHeader from "./ChatHeader"
import Messages from "./Messages"
import ChatFooter from "./ChatFooter"

const ChatBox = () => {
  const conversationContext = React.useContext(ConversationContext)

  return (
    <>
      {conversationContext.selectedConversation ? (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
          <ChatHeader />
          <Box
            width={"100%"}
            sx={{
              position: "relative",
              flexGrow: 1,
              overflow: "scroll",

              backgroundColor: "#F0F4FA",

              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Messages />
          </Box>

          <ChatFooter />
        </Stack>
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
