import { Box, Badge, Stack, Avatar, Typography } from "@mui/material"
import React from "react"
import { ConversationDto } from "../types/ConversationDto"
import { AuthContext } from "../contexts/AuthContext/AuthContext"
import { useSearchParams } from "react-router-dom"

const truncateText = (string: string, n: number) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string
}

function formatDate(date: Date): string {
  const now = new Date()
  const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
  const oneWeek = 7 * oneDay // milliseconds in a week

  const isSameDay = now.toDateString() === date.toDateString()
  const isYesterday = now.getTime() - date.getTime() < oneDay && !isSameDay
  const isWithinOneWeek = now.getTime() - date.getTime() < oneWeek

  if (isSameDay) {
    // Today
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } else if (isYesterday) {
    // Yesterday
    return "Yesterday"
  } else if (isWithinOneWeek) {
    // Within the last week
    return date.toLocaleDateString("en-US", { weekday: "short" })
  } else {
    // Over a week ago
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

export default function ChatElement({
  conversation,
}: {
  conversation: ConversationDto
}) {
  const authContext = React.useContext(AuthContext)

  const name = () => {
    if (authContext.userType === "customer") {
      return conversation.service_provider_name
    } else {
      return conversation.customer_name
    }
  }

  const picture = () => {
    if (authContext.userType === "customer") {
      return conversation.service_provider_id.picture
    } else {
      return conversation.customer_id.picture
    }
  }

  const date = () => {
    if (conversation.latest_message) {
      return new Date(conversation.latest_message.updated_at)
    } else {
      return new Date(conversation.created_at)
    }
  }

  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
      }}
      p={2}
      onClick={() => {
        searchParams.set("id", conversation._id)
        setSearchParams(searchParams);
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          <Avatar alt={name()} src={picture()} />
          <Stack spacing={0.3}>
            <Typography variant="subtitle2" fontWeight="bold">
              {name()}
            </Typography>
            {conversation.latest_message ? (
              <Typography variant="caption">
                {truncateText(conversation.latest_message.text, 20)}
              </Typography>
            ) : (
              <Typography variant="caption" color="grey">
                {"<No messages yet>"}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {formatDate(date())}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={conversation.unreadMessagesCount}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
