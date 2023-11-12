import React from "react"
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"

import { MessageDto, MessageTypeEnum } from "../../types/MessageDto"
import {
  TextMsg,
  MediaMsg,
  DocMsg,
  QuoteMsg,
  AcceptRejectMsg,
  CompleteReviewMsg,
} from "../../components/MessageTypes"

function Messages({
  messages,
  setMessages,
  loading,
  scrollRef,
  isTyping,
  loadMore,
}: {
  messages: MessageDto[]
  setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>
  loading: boolean
  scrollRef: React.MutableRefObject<HTMLDivElement | null>
  isTyping: boolean
  loadMore: () => void
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      {loading && (
        <CircularProgress color="inherit" sx={{ alignSelf: "center" }} />
      )}
      <Box p={3} width="100%">
        <Stack direction="row" justifyContent={"center"}>
          <Box
            sx={{
              backgroundColor: "#ebebeb",
              borderRadius: 1.5,
              width: "max-content",
            }}
          >
            <Button onClick={loadMore}>{"Load more..."}</Button>
          </Box>
        </Stack>
        <Stack spacing={3} direction={"column-reverse"}>
          {isTyping && (
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
          )}
          {messages.map((message) => {
            switch (message.message_type) {
              case MessageTypeEnum.IMAGE:
                return <MediaMsg key={message._id} message={message} />
              case MessageTypeEnum.DOCUMENT:
                return <DocMsg key={message._id} message={message} />
              case MessageTypeEnum.QUOTE_OFFER:
                return (
                  <QuoteMsg
                    key={message._id}
                    message={message}
                    messages={messages}
                    setMessages={setMessages}
                  />
                )
              case MessageTypeEnum.ACCEPT_QUOTE_MESSAGE:
                return (
                  <AcceptRejectMsg
                    key={message._id}
                    message={message}
                    accepted={true}
                  />
                )
              case MessageTypeEnum.REJECT_QUOTE_MESSAGE:
                return (
                  <AcceptRejectMsg
                    key={message._id}
                    message={message}
                    accepted={false}
                  />
                )
              case MessageTypeEnum.COMPLETED_MESSAGE:
                return <CompleteReviewMsg key={message._id} message={message} />
              case MessageTypeEnum.REVIEWED_MESSAGE:
                return <CompleteReviewMsg key={message._id} message={message} />
              default:
                return <TextMsg key={message._id} message={message} />
            }
          })}
        </Stack>
        <Box ref={scrollRef} mt={0} />
      </Box>
    </Box>
  )
}

export default Messages
