import { Box, useTheme, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Logo from "../../assets/logo.svg"

const DashboardLayout = () => {
  const theme = useTheme()

  return (
    <>
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
                backgroundColor: theme.palette.secondary.main,
                alignItems: "center",
                justifyContent: "center",
              }}
              p={1}
              src={Logo}
            />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  )
}

export default DashboardLayout
