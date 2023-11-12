import { Box, Typography, Avatar } from "@mui/material"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"

import { UserDto } from "../types/UserDto"
import { displayRating } from "../helper/helper"

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
      <Box width={"190px"}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography fontWeight={"bold"}>{user.name}</Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography fontSize={"13px"} pl={1}>
              {displayRating(user.ratings)}
            </Typography>
            <StarRateRoundedIcon sx={{ fontSize: "13px" }} />
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography fontWeight={"bold"}>Email:</Typography>
          <Typography fontSize={"13px"} pl={1}>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default UserListItem
