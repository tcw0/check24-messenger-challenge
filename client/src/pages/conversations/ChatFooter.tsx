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
  messages,
  setMessages,
}: {
  messages: MessageDto[]
  setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>
}) {
  const theme = useTheme()
  const [openPicker, setOpenPicker] = React.useState(false)
  const [openEmojis, setOpenEmojis] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)
  const conversationContext = React.useContext(ConversationContext)

  const sendMessage = async (
    newMessage: string,
    messageType: MessageTypeEnum,
    event?: FormEvent<HTMLFormElement>
  ) => {
    console.log("Send Message Image")
    if (event) {
      event.preventDefault()
    }
    if (!newMessage) {
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

      console.log("Post Image")

      const { data } = await axios.post(
        `/api/messages`,
        {
          conversationId: conversationContext.selectedConversation._id,
          text: newMessage,
          messageType: messageType,
        },
        config
      )
      console.log("Get image", data)
      setMessages([...messages, data])
      conversationContext.setFetchConversations((val) => !val)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

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
            sendMessage(data.url.toString(), MessageTypeEnum.IMAGE, undefined)
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

  //   const sendDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //     try {
  //       console.log("Send image")
  //       const { files } = event.currentTarget
  //       const file = files?.[0]
  //       if (file && file.size > 5 * 1024 * 1024) {
  //         snackbarContext.showSnackBarWithMessage(
  //           "Image is too big (max 5MB)",
  //           "warning"
  //         )
  //       } else if (file) {
  //         console.log("File existing")

  //         const formData = new FormData()

  //         formData.append("image", file)

  //         await fetch(
  //           "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((result) => {
  //             console.log("Success:", result)
  //           })
  //           .catch((error) => {
  //             console.error("Error:", error)
  //           })
  //       }
  //     } catch (error) {
  //       snackbarContext.showSnackBarWithError(error)
  //     }
  //   }

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
            sendMessage(
              data.url.toString(),
              MessageTypeEnum.DOCUMENT,
              undefined
            )
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
                display: openEmojis ? "inline" : "none",
                bottom: 81,
                right: 100,
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
                  <Stack sx={{ position: "relative" }}>
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setOpenEmojis(!openEmojis)
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
              onSubmit={(event) =>
                sendMessage(message, MessageTypeEnum.STANDARD_MESSAGE, event)
              }
            >
              <IconButton disabled={!message} type="submit">
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
