import { Box, Stack, useTheme } from "@mui/material"
import ConversationList from "./ConversationList"
import ChatBox from "./ChatBox"

function ChatPage() {
  const theme = useTheme()

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <ConversationList />
        <Box
          sx={{
            height: "100%",
            width: `calc(100vw - 740px )`,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
          }}
        >
          <ChatBox />
        </Box>
      </Stack>
    </>
  )
}

export default ChatPage
