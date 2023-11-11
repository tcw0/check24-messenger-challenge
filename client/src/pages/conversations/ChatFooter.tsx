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
} from "@mui/material"

import SendIcon from "@mui/icons-material/Send"
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined"
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined"

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

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
  },
  {
    color: "#1b8cfe",
    icon: <InsertDriveFileOutlinedIcon sx={{ color: "white" }} />,
    y: 172,
    title: "Document",
  },
  {
    color: "#0172e4",
    icon: <PhotoCameraOutlinedIcon sx={{ color: "white" }} />,
    y: 242,
    title: "Camera",
  },
]

function ChatFooter() {
  const theme = useTheme()
  const [openPicker, setOpenPicker] = React.useState(false)

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
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: 420,
              }}
            >
              <Picker data={data} onEmojiSelect={console.log} />
            </Box>
            {/* Chat Input */}
            {/* <ChatInput openPicker={openPicker} setOpenPicker={setOpenPicker} /> */}
            <StyledInput
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
                      {Actions.map((el) => (
                        <Tooltip placement="right" title={el.title}>
                          <Fab
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
                          setOpenPicker(!openPicker)
                        }}
                      >
                        <SentimentSatisfiedAltIcon />
                      </IconButton>
                    </InputAdornment>
                  </Stack>
                ),
              }}
            />
            {/* <TextField
              id="filled-textarea"
              placeholder="Placeholder"
              multiline
              maxRows={5}
              variant="filled"
              sx={{ height: "23px"}}
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
                      {Actions.map((el) => (
                        <Tooltip placement="right" title={el.title}>
                          <Fab
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
                          setOpenPicker(!openPicker)
                        }}
                      >
                        <SentimentSatisfiedAltIcon />
                      </IconButton>
                    </InputAdornment>
                  </Stack>
                ),
              }}
            /> */}
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
              justifyContent="center"
            >
              <IconButton>
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
