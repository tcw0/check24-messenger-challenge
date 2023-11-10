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
  time,
  unread,
}: {
  id: string
  img: string
  name: string
  msg: string
  time: string
  unread: number
}) {
  const [searchParams, setSearchParams] = useSearchParams()

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
            {time}
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
