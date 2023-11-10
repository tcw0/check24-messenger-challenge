import "./styles.css"
import React, { useState } from "react"
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
import ChatElement from "../../components/ChatElement"
import { ConversationDto } from "../../types/ConversationDto"

function ConversationList({
  selectedConversationId,
  fetchAgain,
}: {
  selectedConversationId?: string
  fetchAgain: boolean
}) {
  const [conversations, setConversations] = useState<ConversationDto[]>([])

  const snackbarContext = React.useContext(SnackbarContext)
  const authContext = React.useContext(AuthContext)

  const fetchConversations = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authContext.authToken}`,
        },
      }

      console.log("Fetching chats")

      const { data } = await axios.get("/api/conversations", config)

      console.log("Get successful", data)
      setConversations(data)
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  React.useEffect(() => {
    fetchConversations()
    // eslint-disable-next-line
  }, [fetchAgain])

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
        <List
          sx={{
            width: "100%",
            overflowY: "auto",
            height: "100%",
          }}
          disablePadding
        >
          {conversations.map((conversation) => {
            return (
              <Box key={conversation._id}>
                <ListItem
                  sx={{
                    padding: 0,
                    backgroundColor:
                      selectedConversationId === conversation._id
                        ? "#DDE8F6"
                        : "#F8FAFF",
                  }}
                >
                  <ListItemButton
                    sx={{
                      padding: 1,
                      py: 2,
                    }}
                    selected={selectedConversationId === conversation._id}
                  >
                    <ChatElement
                      id={conversation._id}
                      img={
                        authContext.userType === "customer"
                          ? conversation.service_provider_id.picture
                          : conversation.customer_id.picture
                      }
                      name={
                        authContext.userType === "customer"
                          ? conversation.service_provider_name
                          : conversation.customer_name
                      }
                      msg={
                        conversation.latest_message
                          ? conversation.latest_message.text
                          : ""
                      }
                      date={
                        conversation.latest_message
                          ? conversation.latest_message.updated_at
                          : new Date(conversation.created_at)
                      }
                      unread={conversation.unread_messages}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            )
          })}
        </List>
      </Stack>
    </Box>
  )
}

export default ConversationList
