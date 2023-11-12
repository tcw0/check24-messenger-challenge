import { useEffect, useContext } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"

import {
  Box,
  useTheme,
  Stack,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"

import Logo from "../assets/logo_white2.svg"
import { AuthContext } from "../contexts/AuthContext/AuthContext"
import SideDrawer from "../pages/conversations/SideDrawer"

const SideNav = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/auth")
    }
  }, [navigate, authContext.authToken])

  const theme = useTheme()

  const handleLogout = () => {
    authContext.logout()
    navigate("/auth")
  }

  return (
    <>
      <Stack direction="row">
        <Box
          sx={{
            height: "100vh",
            width: 100,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            py={3}
            alignItems={"center"}
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack alignItems={"center"} spacing={4}>
              <Box
                component={"img"}
                sx={{
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                  backgroundColor: theme.palette.primary.main,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                p={1}
                src={Logo}
              />
              {authContext.userType === "customer" && <SideDrawer />}
            </Stack>
            <Stack spacing={4} alignItems="center">
              <Divider sx={{ width: 55 }} />
              <Tooltip title="Logout" placement="right">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    width: "max-content",
                    color: theme.palette.text.primary,
                  }}
                >
                  <LogoutIcon sx={{ height: 40, width: 40 }} />
                </IconButton>
              </Tooltip>
              <Avatar
                alt={authContext.userName}
                src={authContext.userPicture}
                variant="circular"
                sx={{ height: 56, width: 56 }}
              />
            </Stack>
          </Stack>
        </Box>
        <Outlet />
      </Stack>
    </>
  )
}

export default SideNav
