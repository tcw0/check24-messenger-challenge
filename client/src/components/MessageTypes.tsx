import React from "react"
import { Box, Fab, IconButton, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import io, { Socket } from "socket.io-client"

import { MessageDto } from "../types/MessageDto"
import { AuthContext } from "../contexts/AuthContext/AuthContext"
import { SnackbarContext } from "../contexts/SnackbarContext/SnackbarContext"
import axios from "axios"
import { ConversationContext } from "../contexts/ConversationContext/ConversationContext"
import { ConversationStateEnum } from "../types/ConversationDto"

function formatTime(date: Date): string {
  const givenDate = new Date(date)
  const now = new Date()
  const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
  const oneWeek = 7 * oneDay // milliseconds in a week

  const isSameDay = now.toDateString() === givenDate.toDateString()
  const isYesterday = now.getTime() - givenDate.getTime() < oneDay && !isSameDay
  const isWithinOneWeek = now.getTime() - givenDate.getTime() < oneWeek

  if (isSameDay) {
    // Today
    return givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  } else if (isYesterday || isWithinOneWeek) {
    // Yesterday or within the last week
    return `${givenDate.toLocaleDateString("en-US", {
      weekday: "short",
    })} ${givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  } else {
    // Over a week ago
    return `${givenDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })} ${givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }
}

export const TextMsg = ({ message }: { message: MessageDto }) => {
  const theme = useTheme()

  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: outgoing() ? theme.palette.primary.main : "#fff",
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "70%",
        }}
      >
        <Typography
          variant="body2"
          color={outgoing() ? "#fff" : theme.palette.text.primary}
        >
          {message.text}
        </Typography>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
        >
          <Typography
            fontSize={10}
            color={outgoing() ? "#fff" : theme.palette.text.primary}
          >
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}

export const MediaMsg = ({ message }: { message: MessageDto }) => {
  const theme = useTheme()

  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: outgoing() ? theme.palette.primary.main : "#fff",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={message.text}
            alt={message.text}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
        </Stack>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
        >
          <Typography
            fontSize={10}
            color={outgoing() ? "#fff" : theme.palette.text.primary}
            pt={0.5}
          >
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}

export const DocMsg = ({ message }: { message: MessageDto }) => {
  const theme = useTheme()

  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: outgoing() ? theme.palette.primary.main : "#fff",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <IconButton onClick={() => window.open(message.text)}>
          <InsertDriveFileOutlinedIcon
            sx={{ color: outgoing() ? "#fff" : theme.palette.text.primary }}
          />
          <Typography color={outgoing() ? "#fff" : theme.palette.text.primary}>
            Open document
          </Typography>
        </IconButton>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
        >
          <Typography
            fontSize={10}
            color={outgoing() ? "#fff" : theme.palette.text.primary}
          >
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}

const ENDPOINT = "http://localhost:3000"
let socket: Socket

export const QuoteMsg = ({
  message,
  messages,
  setMessages,
}: {
  message: MessageDto
  messages: MessageDto[]
  setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>
}) => {
  const theme = useTheme()

  const [disabled, setDisabled] = React.useState(false)

  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)
  const conversationContext = React.useContext(ConversationContext)

  React.useEffect(() => {
    socket = io(ENDPOINT)
  }, [])

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  const onAccept = async () => {
    try {
      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to accept quotes",
          "warning"
        )
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.put(
        `/api/conversations/accept/${message.conversation_id}`,
        {},
        config
      )
      console.log("Accepted Quote", data)
      socket.emit("new message", data)
      setMessages([...messages, data])
      conversationContext.setFetchConversations((val) => !val)
      setDisabled(true)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  const onReject = async () => {
    try {
      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to reject quotes",
          "warning"
        )
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.put(
        `/api/conversations/reject/${message.conversation_id}`,
        {},
        config
      )
      console.log("Rejected Quote", data)
      socket.emit("new message", data)
      setMessages([...messages, data])
      conversationContext.setFetchConversations((val) => !val)
      setDisabled(true)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  return (
    <Stack
      direction={outgoing() ? "row-reverse" : "row"}
      justifyContent={outgoing() ? "end" : "start"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: outgoing() ? theme.palette.primary.main : "#fff",
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "70%",
          minHeight: "100px",
        }}
      >
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography
            variant="body2"
            color={outgoing() ? "#fff" : theme.palette.text.primary}
          >
            {message.text}
          </Typography>
        </Box>

        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography
            fontSize={10}
            color={outgoing() ? "#fff" : theme.palette.text.primary}
          >
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
      <Stack
        direction="column"
        justifyContent={"space-evenly"}
        pl={outgoing() ? 0 : 2}
        pr={outgoing() ? 2 : 0}
        spacing={1}
      >
        <Fab
          color="success"
          onClick={onAccept}
          disabled={
            outgoing() ||
            disabled ||
            conversationContext.selectedConversation?.state !==
              ConversationStateEnum.QUOTED
          }
          sx={{
            width: "50px",
            height: "50px",
          }}
        >
          <CheckIcon />
        </Fab>
        <Fab
          color="error"
          onClick={onReject}
          disabled={
            outgoing() ||
            disabled ||
            conversationContext.selectedConversation?.state !==
              ConversationStateEnum.QUOTED
          }
          sx={{
            width: "50px",
            height: "50px",
          }}
        >
          <CloseIcon />
        </Fab>
      </Stack>
    </Stack>
  )
}

export const AcceptRejectMsg = ({
  message,
  accepted,
}: {
  message: MessageDto
  accepted: boolean
}) => {
  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: accepted ? "#2e7d32" : "#d32f2f",
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "70%",
          minHeight: "100px",
        }}
      >
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography variant="body1" color={"#fff"} fontWeight={"bold"}>
            {message.text}
          </Typography>
        </Box>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography fontSize={10} color={"#fff"}>
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}

export const CompleteReviewMsg = ({ message }: { message: MessageDto }) => {
  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        px={1.5}
        pt={1.5}
        pb={0.5}
        sx={{
          backgroundColor: "grey",
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "70%",
          minHeight: "100px",
        }}
      >
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography variant="body1" color={"#fff"} fontWeight={"bold"}>
            {message.text}
          </Typography>
        </Box>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography fontSize={10} color={"#fff"}>
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}
