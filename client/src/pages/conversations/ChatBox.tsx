import React from "react"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { Stack, Typography, Box } from "@mui/material"
import NoChat from "../../components/NoChat"
import ChatHeader from "./ChatHeader"
import Messages from "./Messages"
import ChatFooter from "./ChatFooter"
import { MessageDto } from "../../types/MessageDto"
import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import axios from "axios"

const ChatBox = () => {
  const [messages, setMessages] = React.useState<MessageDto[]>([])
  const [loading, setLoading] = React.useState(false);

  const conversationContext = React.useContext(ConversationContext)
  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)

  const fetchMessages = async () => {
    if (!conversationContext.selectedConversation) return;

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
      };

      setLoading(true);

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
      );
      setMessages(data);
      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  };

  React.useEffect(() => {
    fetchMessages();

    // selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [conversationContext.selectedConversation]);

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

          <ChatFooter messages={messages} setMessages={setMessages} />
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
