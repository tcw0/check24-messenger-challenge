import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// mui components
import {
  IconButton,
  Divider,
  Link,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"

// mui icons
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

// references
// import { AuthContext } from 'src/context/AuthContext'
import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"

export default function Login({
  setOpenLogin,
  setOpenSignup,
}: {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
  setOpenSignup: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)

  const [loading, setLoading] = React.useState(false)

  // const authContext = React.useContext(AuthContext)
  const snackbarContext = React.useContext(SnackbarContext)

  const navigate = useNavigate()

  const sendLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      )
      setLoading(false)
      snackbarContext.showSnackBarWithMessage("Login successful", "success")
      setOpenLogin(false)
      navigate("/app")
    } catch (error) {
      snackbarContext.showSnackBarWithError(error)
    }
  }

  const handleSignup = () => {
    setOpenSignup(true)
  }

  return (
    <Box component="form" onSubmit={sendLogin} noValidate>
      <TextField
        label="Email"
        type="email"
        id="email"
        name="email"
        required
        fullWidth
        margin="normal"
        autoComplete="email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value)
        }}
      />
      <FormControl variant="outlined" required fullWidth margin="normal">
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(event) => {
                setRememberMe(event.target.checked)
              }}
              color="primary"
            />
          }
          label="Remember me"
        />
      </Box>
      <Link href="/" variant="body2">
        Privacy Policy
      </Link>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        loading={loading}
        disabled={!email || !password}
        sx={{
          my: 2,
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Continue
      </LoadingButton>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Divider sx={{ width: "100%" }}>or</Divider>
      </Box>
      <Button
        onClick={handleSignup}
        fullWidth
        variant="contained"
        color="secondary"
        sx={{
          my: 2,
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Sign up
      </Button>
    </Box>
  )
}
