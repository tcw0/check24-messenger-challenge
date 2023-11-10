import React from "react"

import { Box, Stack, Typography, useTheme } from "@mui/material"
import ConversationList from "./ConversationList"
import ChatBox from "./ChatBox"
import NoChat from "../../components/NoChat"
import { useSearchParams } from "react-router-dom"

function ChatPage() {
  const theme = useTheme()

  const conversationId = useSearchParams()[0].get("id")
  const [fetchAgain, setFetchAgain] = React.useState(false)

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <ConversationList
          selectedConversationId={conversationId ? conversationId : undefined}
          fetchAgain={fetchAgain}
        />
        <Box
          sx={{
            height: "100%",
            width: `calc(100vw - 740px )`,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
          }}
        >
          {conversationId ? (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
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
        </Box>
      </Stack>
    </>
  )
}

export default ChatPage
