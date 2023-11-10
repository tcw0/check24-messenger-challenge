import "./styles.css"
import React from "react"
import axios from "axios"
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Divider,
} from "@mui/material"

import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { ConversationContext } from "../../contexts/ChatContext/ConversationContext"
import ChatElement from "../../components/ChatElement"
import ChatLoading from "../../components/ChatLoading"

function ConversationList() {
  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)
  const conversationContext = React.useContext(ConversationContext)

  const fetchConversations = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      const { data } = await axios.get("/api/conversations", config)

      conversationContext.setConversations(data)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  React.useEffect(() => {
    fetchConversations()
    // eslint-disable-next-line
  }, [conversationContext.fetchConversations])

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 320,
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack spacing={2} sx={{ maxHeight: "100vh" }}>
        <Typography variant="h5" px={3} py={3}>
          Conversations
        </Typography>
        <Divider />
        {conversationContext.conversations ? (
          <List
            sx={{
              width: "100%",
              overflowY: "auto",
              height: "100%",
            }}
            disablePadding
          >
            {conversationContext.conversations.map((conversation) => {
              return (
                <Box key={conversation._id}>
                  <ListItem
                    sx={{
                      padding: 0,
                      backgroundColor:
                        conversationContext.selectedConversation?._id ===
                        conversation._id
                          ? "#DDE8F6"
                          : "#F8FAFF",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        padding: 1,
                        py: 2,
                      }}
                      selected={
                        conversationContext.selectedConversation?._id ===
                        conversation._id
                      }
                      onClick={() => {
                        conversationContext.setSelectedConversation(
                          conversation
                        )
                      }}
                    >
                      <ChatElement conversation={conversation} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Box>
              )
            })}
          </List>
        ) : (
          <ChatLoading />
        )}
      </Stack>
    </Box>
  )
}

export default ConversationList
