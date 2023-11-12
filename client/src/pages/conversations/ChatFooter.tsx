import React from "react"
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
  Checkbox,
  Typography,
} from "@mui/material"

import SendIcon from "@mui/icons-material/Send"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined"

import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
import { MessageTypeEnum } from "../../types/MessageDto"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { ConversationStateEnum } from "../../types/ConversationDto"

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
    acceptedFiles: ".png, .jpg, .jpeg, .gif",
  },
  {
    color: "#1b8cfe",
    icon: <InsertDriveFileOutlinedIcon sx={{ color: "white" }} />,
    y: 172,
    title: "Document",
    acceptedFiles: "application/pdf",
  },
]

function ChatFooter({
  sendMessage,
  typingHandler,
}: {
  sendMessage: (
    newMessage: string,
    messageType: MessageTypeEnum
  ) => Promise<void>
  typingHandler: () => void
}) {
  const theme = useTheme()
  const [openPicker, setOpenPicker] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [isQuote, setIsQuote] = React.useState(false)
  const [disableCheckbox, setDisableCheckbox] = React.useState(false)

  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)
  const conversationContext = React.useContext(ConversationContext)

  const sendImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log("Send image")
      const { files } = event.currentTarget
      const file = files?.[0]
      if (file && file.size > 5 * 1024 * 1024) {
        snackbarContext.showSnackBarWithMessage(
          "Image is too big (max 5MB)",
          "warning"
        )
      } else if (file) {
        console.log("File existing")

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "check24-messenger-challenge")
        data.append("cloud_name", "dfwi4nnfn")
        await fetch("https://api.cloudinary.com/v1_1/dfwi4nnfn/raw/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Image uploaded", data.url.toString())
            sendMessage(data.url.toString(), MessageTypeEnum.IMAGE)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
    setOpenPicker(false)
  }

  const sendDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log("Send image")
      const { files } = event.currentTarget
      const file = files?.[0]
      if (file && file.size > 5 * 1024 * 1024) {
        snackbarContext.showSnackBarWithMessage(
          "Image is too big (max 5MB)",
          "warning"
        )
      } else if (file) {
        console.log("File existing")

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "check24-messenger-challenge")
        data.append("cloud_name", "dfwi4nnfn")
        await fetch("https://api.cloudinary.com/v1_1/dfwi4nnfn/raw/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Image uploaded", data.url.toString())
            sendMessage(data.url.toString(), MessageTypeEnum.DOCUMENT)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
    setOpenPicker(false)
  }

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault() // Prevent new line
      sendMessage(
        message,
        isQuote ? MessageTypeEnum.QUOTE_OFFER : MessageTypeEnum.STANDARD_MESSAGE
      )
      setMessage("")

      if (isQuote) {
        setDisableCheckbox(true)
        setIsQuote(false)
      }
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
            <StyledInput
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                typingHandler()
              }}
              disabled={
                conversationContext.selectedConversation?.state ===
                  ConversationStateEnum.REJECTED ||
                conversationContext.selectedConversation?.state ===
                  ConversationStateEnum.COMPLETED ||
                conversationContext.selectedConversation?.state ===
                  ConversationStateEnum.REVIEWED ||
                conversationContext.selectedConversation?.deleted_at
                  ? true
                  : false
              }
              onKeyDown={handleEnterKeyPress}
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
                      {Actions.map((el, idx) => (
                        <Tooltip
                          key={el.title}
                          placement="right"
                          title={el.title}
                        >
                          <Fab
                            component="label"
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
                            <input
                              type="file"
                              accept={el.acceptedFiles}
                              style={{ display: "none" }}
                              onChange={idx === 0 ? sendImage : sendDocument}
                            />
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
                  <>
                    {authContext.userType !== "customer" &&
                      !disableCheckbox &&
                      conversationContext.selectedConversation?.state ===
                        ConversationStateEnum.QUOTED && (
                        <Stack sx={{ position: "relative" }}>
                          <InputAdornment position="end">
                            <Typography variant="body2">Quote</Typography>
                            <Checkbox
                              checked={isQuote}
                              onChange={(event) => {
                                setIsQuote(event.target.checked)
                              }}
                            />
                          </InputAdornment>
                        </Stack>
                      )}
                  </>
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
            >
              <IconButton
                disabled={!message}
                onClick={() => {
                  sendMessage(
                    message,
                    isQuote
                      ? MessageTypeEnum.QUOTE_OFFER
                      : MessageTypeEnum.STANDARD_MESSAGE
                  )
                  setMessage("")

                  if (isQuote) {
                    setDisableCheckbox(true)
                    setIsQuote(false)
                  }
                }}
              >
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
