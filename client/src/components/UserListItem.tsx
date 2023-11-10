import { Box, Typography, Avatar } from "@mui/material"
import { UserDto } from "../types/UserDto"

const UserListItem = ({ user }: { user: UserDto }) => {
  return (
    <>
      <Avatar
        alt={user.name}
        src={user.picture}
        variant="rounded"
        sx={{
          mr: 2,
        }}
      />
      <Box>
        <Typography fontWeight={"bold"}>{user.name}</Typography>
        <Typography fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Typography>
      </Box>
    </>
  )
}

export default UserListItem
