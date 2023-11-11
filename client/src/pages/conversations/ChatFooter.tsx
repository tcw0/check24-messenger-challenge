import React, { FormEvent } from "react"
import {
  Box,
  IconButton,
  Stack,
  TextField,
  styled,
  Fab,
  Tooltip,
  InputAdornment,
  useTheme,
} from "@mui/material"

import SendIcon from "@mui/icons-material/Send"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined"
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined"

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import axios from "axios"
import { MessageDto, MessageTypeEnum } from "../../types/MessageDto"

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
  },
  "& .MuiInputBase-root": {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
}))

const Actions = [
  {
    color: "#4da5fe",
    icon: <InsertPhotoOutlinedIcon sx={{ color: "white" }} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <InsertDriveFileOutlinedIcon sx={{ color: "white" }} />,
    y: 172,
    title: "Document",
  },
  {
    color: "#0172e4",
    icon: <PhotoCameraOutlinedIcon sx={{ color: "white" }} />,
    y: 242,
    title: "Camera",
  },
]

function ChatFooter({
  messages,
  setMessages,
}: {
  messages: MessageDto[]
  setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>
}) {
  const theme = useTheme()
  const [openPicker, setOpenPicker] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)
  const conversationContext = React.useContext(ConversationContext)

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Send message")
    if (!message) {
      snackbarContext.showSnackBarWithMessage(
        "Please enter a message",
        "warning"
      )
      return
    }
    try {
      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to send a message",
          "warning"
        )
        return
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      if (!conversationContext.selectedConversation) {
        snackbarContext.showSnackBarWithMessage(
          "Please select a conversation to send a message",
          "warning"
        )
        return
      }
      setMessage("")

      const { data } = await axios.post(
        `/api/messages`,
        {
          conversationId: conversationContext.selectedConversation._id,
          text: message,
          messageType: MessageTypeEnum.STANDARD_MESSAGE,
        },
        config
      )
      console.log("Get message", data)
      setMessages([...messages, data])
      conversationContext.setFetchConversations((val) => !val)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={2}
        width={"100%"}
        sx={{
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <Stack sx={{ width: "100%" }}>
            <Box
              style={{
                zIndex: 10,
                position: "fixed",
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: 420,
              }}
            >
              <Picker data={data} onEmojiSelect={console.log} />
            </Box>
            {/* Chat Input */}
            <StyledInput
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              fullWidth
              placeholder="Write a message..."
              variant="filled"
              multiline
              maxRows={6}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <Stack sx={{ width: "max-content" }}>
                    <Stack
                      sx={{
                        position: "relative",
                        display: openPicker ? "inline-block" : "none",
                      }}
                    >
                      {Actions.map((el) => (
                        <Tooltip
                          key={el.title}
                          placement="right"
                          title={el.title}
                        >
                          <Fab
                            onClick={() => {
                              setOpenPicker(!openPicker)
                            }}
                            sx={{
                              position: "absolute",
                              top: -el.y,
                              backgroundColor: el.color,
                              "&:hover": {
                                backgroundColor: theme.palette.secondary.main,
                              },
                            }}
                            aria-label="add"
                          >
                            {el.icon}
                          </Fab>
                        </Tooltip>
                      ))}
                    </Stack>

                    <InputAdornment position="end" sx={{ mt: 0 }}>
                      <IconButton
                        onClick={() => {
                          setOpenPicker(!openPicker)
                        }}
                        sx={{ mr: 1 }}
                      >
                        <AttachFileOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  </Stack>
                ),
                endAdornment: (
                  <Stack sx={{ position: "relative" }}>
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setOpenPicker(!openPicker)
                        }}
                      >
                        <SentimentSatisfiedAltIcon />
                      </IconButton>
                    </InputAdornment>
                  </Stack>
                ),
              }}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
              component="form"
              onSubmit={sendMessage}
            >
              <IconButton disabled={!message} type="submit" color="primary">
                <SendIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default ChatFooter
