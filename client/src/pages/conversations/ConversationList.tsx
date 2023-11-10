import "./styles.css"
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Divider,
} from "@mui/material"
import ChatElement from "../../components/ChatElement"

function ConversationList({
  selectedConversationId,
}: {
  selectedConversationId?: string
}) {
  const conversations = [
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
  ]

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
              <Box key={conversation.id}>
                <ListItem sx={{ padding: 0 }}>
                  <ListItemButton
                    sx={{ padding: 1, py: 2 }}
                    selected={selectedConversationId === conversation.id}
                  >
                    <ChatElement {...conversation} />
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
