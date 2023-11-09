import * as React from "react"

// mui components
import { Box, Button, Stack } from "@mui/material"

// references
import Logo from "../../assets/logo_white.png"
import LoginSignup from "./LoginSignup"

export default function Homepage() {
  const [openLogin, setOpenLogin] = React.useState(false)

  const handleLogin = () => {
    setOpenLogin(true)
  }

  return (
    <>
      <Stack
        sx={{
          background: "linear-gradient(45deg, #011330, #16376f)",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component={"img"}
          sx={{
            borderRadius: 1.5,
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
          }}
          p={1}
          src={Logo}
        />
        <Button
          onClick={handleLogin}
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            my: 2,
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Log in
        </Button>
      </Stack>
      <LoginSignup openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  )
}
