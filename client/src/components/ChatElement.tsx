import { Box, Badge, Stack, Avatar, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useSearchParams } from "react-router-dom"

const truncateText = (string: string, n: number) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string
}

const StyledChatBox = styled(Box)(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}))

export default function ChatElement({
  id,
  img,
  name,
  msg,
  date,
  unread,
}: {
  id: string
  img: string
  name: string
  msg: string
  date: Date
  unread: number
}) {
  const [searchParams, setSearchParams] = useSearchParams()

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

  return (
    <StyledChatBox
      onClick={() => {
        searchParams.set("id", id)
        setSearchParams(searchParams)
      }}
      sx={{
        width: "100%",

        borderRadius: 1,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          <Avatar alt={name} src={img} />
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {formatDate(date)}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}
