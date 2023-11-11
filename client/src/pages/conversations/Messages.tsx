import React from "react"
import { MessageDto } from "../../types/MessageDto"
import { Box, CircularProgress, Typography } from "@mui/material"

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
      height="100%"
      width="100%"
    >
      {loading ? (
        <CircularProgress color="inherit" sx={{ alignSelf: "center" }} />
      ) : (
        <>
          {messages.map((message) => (
            <Typography key={message._id}>{message.text}</Typography>
          ))}
        </>
      )}
    </Box>
  )
}

export default Messages
