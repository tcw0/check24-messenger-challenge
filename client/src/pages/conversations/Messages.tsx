import React from "react"
import { Box, CircularProgress, Stack, Typography } from "@mui/material"

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
  firstMessageElementRef,
}: {
  messages: MessageDto[]
  setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>
  loading: boolean
  scrollRef: React.MutableRefObject<HTMLDivElement | null>
  isTyping: boolean
  firstMessageElementRef: React.Ref<unknown> | undefined
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
        <Stack spacing={3}>
          {messages.map((message, idx) => (
            <Box
              key={message._id}
              // ref={idx === 0 ? firstMessageElementRef : undefined}
              ref={
                idx === messages.length - 1 ? firstMessageElementRef : undefined
              }
            >
              {(() => {
                switch (message.message_type) {
                  case MessageTypeEnum.IMAGE:
                    return <MediaMsg message={message} />
                  case MessageTypeEnum.DOCUMENT:
                    return <DocMsg message={message} />
                  case MessageTypeEnum.QUOTE_OFFER:
                    return (
                      <QuoteMsg
                        message={message}
                        messages={messages}
                        setMessages={setMessages}
                      />
                    )
                  case MessageTypeEnum.ACCEPT_QUOTE_MESSAGE:
                    return <AcceptRejectMsg message={message} accepted={true} />
                  case MessageTypeEnum.REJECT_QUOTE_MESSAGE:
                    return (
                      <AcceptRejectMsg message={message} accepted={false} />
                    )
                  case MessageTypeEnum.COMPLETED_MESSAGE:
                    return <CompleteReviewMsg message={message} />
                  case MessageTypeEnum.REVIEWED_MESSAGE:
                    return <CompleteReviewMsg message={message} />
                  default:
                    return <TextMsg message={message} />
                }
              })()}
            </Box>
          ))}
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
    </Box>
  )
}

export default Messages
