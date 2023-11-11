import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"

import { MessageDto } from "../types/MessageDto"
import { AuthContext } from "../contexts/AuthContext/AuthContext"

function formatTime(date: Date): string {
  console.log(date)
  const givenDate = new Date(date)
  const now = new Date()
  const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
  const oneWeek = 7 * oneDay // milliseconds in a week

  const isSameDay = now.toDateString() === givenDate.toDateString()
  const isYesterday = now.getTime() - givenDate.getTime() < oneDay && !isSameDay
  const isWithinOneWeek = now.getTime() - givenDate.getTime() < oneWeek

  if (isSameDay) {
    // Today
    return givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  } else if (isYesterday || isWithinOneWeek) {
    // Yesterday or within the last week
    return `${givenDate.toLocaleDateString("en-US", {
      weekday: "short",
    })} ${givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  } else {
    // Over a week ago
    return `${givenDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })} ${givenDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }
}

export const TextMsg = ({ message }: { message: MessageDto }) => {
  const theme = useTheme()

  const authContext = React.useContext(AuthContext)

  const outgoing = () => {
    if (authContext.userId == message.sender_id._id) {
      return true
    } else {
      return false
    }
  }

  return (
    <Stack direction="row" justifyContent={outgoing() ? "end" : "start"}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: outgoing() ? theme.palette.primary.main : "#fff",
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={outgoing() ? "#fff" : theme.palette.text.primary}
        >
          {message.text}
        </Typography>
        <Box
          flexDirection="row"
          display={"flex"}
          justifyContent={outgoing() ? "end" : "start"}
          alignItems={"center"}
        >
          <Typography
            fontSize={10}
            color={outgoing() ? "#fff" : theme.palette.text.primary}
          >
            {formatTime(message.updated_at)}
          </Typography>
          {message.read_at && outgoing() && (
            <DoneAllOutlinedIcon
              sx={{ color: "white", height: "13px", width: "13px", ml: "5px" }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  )
}
