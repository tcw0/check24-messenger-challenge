import React from "react"
import { Box, CircularProgress, Stack } from "@mui/material"

import { MessageDto, MessageTypeEnum } from "../../types/MessageDto"
import { TextMsg } from "../../components/MessageTypes"

function Messages({
  messages,
  loading,
}: {
  messages: MessageDto[]
  loading: boolean
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      {loading ? (
        <CircularProgress color="inherit" sx={{ alignSelf: "center" }} />
      ) : (
        <Box p={3} width="100%">
          <Stack spacing={3}>
            {messages.map((message) => {
              switch (message.message_type) {
                case MessageTypeEnum.STANDARD_MESSAGE:
                  return <TextMsg key={message._id} message={message} />

                default:
                  return <TextMsg message={message} />
              }
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default Messages
