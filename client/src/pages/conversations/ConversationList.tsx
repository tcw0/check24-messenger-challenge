import "./styles.css"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Link,
  Stack,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Divider,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import ChatElement from "../../components/ChatElement"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}))

function ConversationList({
  selectedConversationId,
}: {
  selectedConversationId?: string
}) {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "2",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "3",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "4",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "5",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "6",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
    {
      id: "7",
      img: "https://source.unsplash.com/random",
      name: "John Doe",
      msg: "Hello",
      time: "10:00",
      unread: 1,
    },
  ])

  // const navigate = useNavigate()

  // const navigateToConversation = (conversationId: string) => {
  //   navigate(`/conversations/${conversationId}`)
  // }

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
              <>
                <ListItem key={conversation.id} sx={{ padding: 0 }}>
                  <ListItemButton
                    sx={{ padding: 1, py: 2 }}
                    selected={selectedConversationId === conversation.id}
                  >
                    <ChatElement {...conversation} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )
          })}
        </List>
      </Stack>
    </Box>
  )
}

export default ConversationList
