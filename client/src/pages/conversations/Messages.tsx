import React from "react"
import { Box, CircularProgress, Stack, Typography } from "@mui/material"

import { MessageDto, MessageTypeEnum } from "../../types/MessageDto"
import { TextMsg, MediaMsg, DocMsg } from "../../components/MessageTypes"

function Messages({
  messages,
  loading,
  scrollRef,
  isTyping,
}: {
  messages: MessageDto[]
  loading: boolean
  scrollRef: React.MutableRefObject<HTMLDivElement | null>
  isTyping: boolean
}) {
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
    // eslint-disable-next-line
  }, [messages])

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
                case MessageTypeEnum.IMAGE:
                  return <MediaMsg key={message._id} message={message} />
                case MessageTypeEnum.DOCUMENT:
                  return <DocMsg key={message._id} message={message} />
                default:
                  return <TextMsg key={message._id} message={message} />
              }
            })}
            {isTyping ? (
              <Box
                px={1.5}
                py={1.5}
                sx={{
                  backgroundColor: "#ebebeb",
                  borderRadius: 1.5,
                  width: "max-content",
                }}
              >
                <Typography variant="body2" color={"#8e8e8e"}>
                  {"Typing..."}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Stack>
          <Box ref={scrollRef} mt={0} />
        </Box>
      )}
    </Box>
  )
}

export default Messages
