import React, { FormEvent } from "react"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { Stack, Typography, Box } from "@mui/material"
import NoChat from "../../components/NoChat"
import ChatHeader from "./ChatHeader"
import Messages from "./Messages"
import ChatFooter from "./ChatFooter"
import { MessageDto, MessageTypeEnum } from "../../types/MessageDto"
import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import axios from "axios"

import io, { Socket } from "socket.io-client"
import { ConversationDto } from "../../types/ConversationDto"
const ENDPOINT = "http://localhost:3000"
let socket: Socket, selectedConversationCompare: ConversationDto | undefined

const ChatBox = () => {
  const [messages, setMessages] = React.useState<MessageDto[]>([])
  const [loading, setLoading] = React.useState(false)
  // eslint-disable-next-line
  const [socketConnected, setSocketConnected] = React.useState(false)

  const conversationContext = React.useContext(ConversationContext)
  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)

  const fetchMessages = async () => {
    if (!conversationContext.selectedConversation) return

    try {
      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to see messages",
          "warning"
        )
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      setLoading(true)

      if (!conversationContext.selectedConversation) {
        snackbarContext.showSnackBarWithMessage(
          "Please select a conversation to send a message",
          "warning"
        )
        return
      }

      const { data } = await axios.get(
        `/api/messages/${conversationContext.selectedConversation._id}`,
        config
      )
      setMessages(data)
      setLoading(false)

      socket.emit("join chat", conversationContext.selectedConversation._id)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

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

      console.log("Emit message")
      socket.emit("new message", data)
      setMessages([...messages, data])
      conversationContext.setFetchConversations((val) => !val)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  const updateUnread = async (conversationId: string) => {
    try {
      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to see messages",
          "warning"
        )
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      await axios.put(`/api/messages/unread/${conversationId}`, {}, config)
      console.log("Updated unread")
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  React.useEffect(() => {
    fetchMessages()

    selectedConversationCompare = conversationContext.selectedConversation
    // eslint-disable-next-line
  }, [conversationContext.selectedConversation])

  React.useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", authContext.userId)
    socket.on("connection", () => setSocketConnected(true))
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        !selectedConversationCompare || // if chat is not selected or doesn't match current chat
        selectedConversationCompare._id !==
          newMessageRecieved.conversation_id._id
      ) {
        if (!conversationContext.notification.includes(newMessageRecieved)) {
          conversationContext.setNotification([
            newMessageRecieved,
            ...conversationContext.notification,
          ])
          conversationContext.setFetchConversations(
            !conversationContext.fetchConversations
          )
        }
      } else {
        setMessages([...messages, newMessageRecieved])
        updateUnread(newMessageRecieved.conversation_id._id)
        conversationContext.setFetchConversations(
          !conversationContext.fetchConversations
        )
      }
    })
  })

  return (
    <>
      {conversationContext.selectedConversation ? (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
          <ChatHeader />
          <Box
            width={"100%"}
            sx={{
              position: "relative",
              flexGrow: 1,
              overflow: "scroll",

              backgroundColor: "#F0F4FA",

              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Messages messages={messages} loading={loading} />
          </Box>

          <ChatFooter sendMessage={sendMessage} />
        </Stack>
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
    </>
  )
}

export default ChatBox
