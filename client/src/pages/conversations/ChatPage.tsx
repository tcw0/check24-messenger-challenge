import React, { useState } from "react"

import { Box, Link, Stack, Typography, useTheme } from "@mui/material"
import ConversationList from "./ConversationList"
import ChatBox from "./ChatBox"
import SideDrawer from "./SideDrawer"
import NoChat from "../../components/NoChat"
import { useParams, useSearchParams } from "react-router-dom"

export enum ConversationStateEnum {
  QUOTED = "quoted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export type ConversationDto = {
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

function ChatPage() {
  const theme = useTheme()

  const conversationId = useSearchParams()[0].get("id")

  const [currentConversation, setCurrentConversation] = useState<
    ConversationDto | undefined
  >(undefined)

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <ConversationList
          selectedConversationId={conversationId ? conversationId : undefined}
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
            <ChatBox />
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
