import React from "react"
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

  const [socketConnected, setSocketConnected] = React.useState(false)
  const [typing, setTyping] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)

  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(false)

  const scrollRef = React.useRef<null | HTMLDivElement>(null)
  const [doScroll, setDoScroll] = React.useState(true)

  const conversationContext = React.useContext(ConversationContext)
  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)

  const fetchMessages = async (pageNumber: number) => {
    setLoading(true)
    console.log("Fetching messages", pageNumber)
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

      if (!conversationContext.selectedConversation) {
        snackbarContext.showSnackBarWithMessage(
          "Please select a conversation to send a message",
          "warning"
        )
        return
      }

      const { data } = await axios.get(
        `/api/messages/${conversationContext.selectedConversation._id}?page=${pageNumber}`,
        config
      )
      setMessages((prevMessages) => {
        const messages = [...prevMessages, ...data]
        return Array.from(new Set(messages.map((message) => message._id)))
          .map((_id) => messages.find((message) => message._id === _id))
          .filter((message) => message !== undefined) as MessageDto[]
      })
      setHasMore(data.length > 0)
      setLoading(false)

      socket.emit("join chat", conversationContext.selectedConversation._id)
    } catch (error) {
      if (axios.isCancel(error)) return
      snackbarContext.showSnackBarWithError(error)
    }
  }

  const loadMore = () => {
    if (loading || !hasMore) return
    setPage((prevPage) => {
      setDoScroll(false)
      const nextPage = prevPage + 1
      fetchMessages(nextPage)
      console.log("Loading more messages", nextPage)
      return nextPage
    })
  }

  const sendMessage = async (
    newMessage: string,
    messageType: MessageTypeEnum
  ) => {
    socket.emit("stop typing", {
      room: conversationContext.selectedConversation?._id,
      userId: authContext.userId,
    })

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

      console.log("Sending message", newMessage)
      const { data } = await axios.post(
        `/api/messages`,
        {
          conversationId: conversationContext.selectedConversation._id,
          text: newMessage,
          messageType: messageType,
        },
        config
      )

      socket.emit("new message", data)
      setMessages((prevMessages) => {
        const messages = [data, ...prevMessages]
        return Array.from(new Set(messages.map((message) => message._id)))
          .map((_id) => messages.find((message) => message._id === _id))
          .filter((message) => message !== undefined) as MessageDto[]
      })
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
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  const typingHandler = () => {
    if (!socketConnected) return

    if (!typing) {
      setTyping(true)
      socket.emit("typing", {
        room: conversationContext.selectedConversation?._id,
        userId: authContext.userId,
      })
      console.log(
        "Emmiting typing",
        conversationContext.selectedConversation?._id,
        authContext.userId
      )
    }
    const lastTypingTime = new Date().getTime()
    const timerLength = 3000
    setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", {
          room: conversationContext.selectedConversation?._id,
          userId: authContext.userId,
        })
        setTyping(false)
      }
    }, timerLength)
  }

  React.useEffect(() => {
    setMessages([])
    fetchMessages(page)

    selectedConversationCompare = conversationContext.selectedConversation
    // eslint-disable-next-line
  }, [conversationContext.selectedConversation])

  React.useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", authContext.userId)
    socket.on("connected", () => setSocketConnected(true))

    socket.on("typing", ({ room, userId }) => {
      if (
        userId !== authContext.userId &&
        room === selectedConversationCompare?._id
      ) {
        setIsTyping(true)
      }
    })

    socket.on("stop typing", ({ room, userId }) => {
      if (
        userId !== authContext.userId &&
        room === selectedConversationCompare?._id
      ) {
        setIsTyping(false)
      }
    })
  }, [conversationContext.selectedConversation, authContext.userId])

  React.useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        selectedConversationCompare &&
        selectedConversationCompare._id ===
          newMessageRecieved.conversation_id._id
      ) {
        console.log("Message received", newMessageRecieved)
        setMessages((prevMessages) => {
          const messages = [newMessageRecieved, ...prevMessages]
          return Array.from(new Set(messages.map((message) => message._id)))
            .map((_id) => messages.find((message) => message._id === _id))
            .filter((message) => message !== undefined) as MessageDto[]
        })
        updateUnread(newMessageRecieved.conversation_id._id)
      }

      conversationContext.setFetchConversations(
        !conversationContext.fetchConversations
      )
    })
  })

  React.useEffect(() => {
    if (scrollRef.current && doScroll) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (!doScroll) {
      setDoScroll(true)
    }
    //eslint-disable-next-line
  }, [messages, isTyping])

  const handleComplete = async (): Promise<boolean> => {
    try {
      if (!selectedConversationCompare) {
        snackbarContext.showSnackBarWithMessage(
          "No conversation selected",
          "warning"
        )
        return false
      }

      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to accept quotes",
          "warning"
        )
        return false
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.put(
        `/api/conversations/complete/${selectedConversationCompare._id}`,
        {},
        config
      )
      console.log("Completed conversation", data)
      socket.emit("new message", data)
      setMessages((prevMessages) => {
        const messages = [data, ...prevMessages]
        return Array.from(new Set(messages.map((message) => message._id)))
          .map((_id) => messages.find((message) => message._id === _id))
          .filter((message) => message !== undefined) as MessageDto[]
      })
      conversationContext.setFetchConversations((val) => !val)
      return true
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
    return false
  }

  const handleReview = async (rating: number): Promise<boolean> => {
    try {
      if (!selectedConversationCompare) {
        snackbarContext.showSnackBarWithMessage(
          "No conversation selected",
          "warning"
        )
        return false
      }

      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to accept quotes",
          "warning"
        )
        return false
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.put(
        `/api/conversations/review/${selectedConversationCompare._id}`,
        { rating },
        config
      )
      console.log("Reviewed conversation", data)
      socket.emit("new message", data)
      setMessages((prevMessages) => {
        const messages = [data, ...prevMessages]
        return Array.from(new Set(messages.map((message) => message._id)))
          .map((_id) => messages.find((message) => message._id === _id))
          .filter((message) => message !== undefined) as MessageDto[]
      })
      conversationContext.setFetchConversations((val) => !val)
      return true
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
    return false
  }

  const handleDelete = async (): Promise<boolean> => {
    try {
      if (!selectedConversationCompare) {
        snackbarContext.showSnackBarWithMessage(
          "No conversation selected",
          "warning"
        )
        return false
      }

      if (!authContext.authToken) {
        snackbarContext.showSnackBarWithMessage(
          "Please log in to accept quotes",
          "warning"
        )
        return false
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.put(
        `/api/conversations/delete/${selectedConversationCompare._id}`,
        {},
        config
      )
      console.log("Deleted conversation", data)
      conversationContext.setFetchConversations((val) => !val)
      return true
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
    return false
  }

  return (
    <>
      {conversationContext.selectedConversation ? (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
          <ChatHeader
            handleComplete={handleComplete}
            handleReview={handleReview}
            handleDelete={handleDelete}
          />
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
            <Messages
              messages={messages}
              setMessages={setMessages}
              loading={loading}
              scrollRef={scrollRef}
              isTyping={isTyping}
              loadMore={loadMore}
            />
          </Box>

          <ChatFooter sendMessage={sendMessage} typingHandler={typingHandler} />
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
