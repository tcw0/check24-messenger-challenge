import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// mui components
import { Link, TextField, Box, Tab } from "@mui/material"
import { TabContext, TabList, LoadingButton } from "@mui/lab"

// references
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"

export default function Signup({ handleClose }: { handleClose: () => void }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [repeatedPassword, setRepeatedPassword] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [picture, setPicture] = React.useState("")

  const [tab, setTab] = React.useState("1")

  const [loading, setLoading] = React.useState(false)

  const checkPasswords = () => {
    return repeatedPassword === password
  }

  const authContext = React.useContext(AuthContext)
  const { showSnackBarWithError, showSnackBarWithMessage } =
    React.useContext(SnackbarContext)
  const navigate = useNavigate()

  const sendSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const user_type = tab === "1" ? "customer" : "service_provider"

      const { data } = await axios.post(
        "/api/user/register",
        {
          name,
          email,
          password,
          phone,
          url,
          picture,
          address,
          user_type,
        },
        config
      )
      authContext.login(
        data.token,
        data.id,
        data.name,
        data.picture,
        true, 
        data.user_type
      )
      handleClose()
      showSnackBarWithMessage("User created successfully.", "success")
      navigate("/app")
    } catch (error) {
      showSnackBarWithError(error)
    }

    setLoading(false)
  }

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }

  const handleUploadProfilePicture = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true)
    try {
      const { files } = event.currentTarget
      const file = files?.[0]
      if (file && file.size > 5 * 1024 * 1024) {
        showSnackBarWithMessage("Image is too big (max 5MB)", "warning")
      } else if (file) {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "check24-messenger-challenge")
        data.append("cloud_name", "dfwi4nnfn")
        await fetch("https://api.cloudinary.com/v1_1/dfwi4nnfn/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPicture(data.url.toString())
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (error) {
      showSnackBarWithError(error)
    }
    setLoading(false)
  }

  return (
    <Box component="form" onSubmit={sendSignup} noValidate>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab label="Customer" value="1" />
            <Tab label="Service Provider" value="2" />
          </TabList>
        </Box>
      </TabContext>
      <TextField
        label="Name"
        type="text"
        id="name"
        name="name"
        required
        fullWidth
        size="small"
        margin="dense"
        autoComplete="off"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value)
        }}
      />
      <TextField
        label="Email"
        type="email"
        id="email"
        name="email"
        required
        fullWidth
        size="small"
        margin="dense"
        autoComplete="off"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value)
        }}
      />
      <TextField
        label="Password"
        type="password"
        id="password"
        name="password"
        required
        fullWidth
        size="small"
        margin="dense"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value)
        }}
      />
      <TextField
        label="Repeat Password"
        type="password"
        id="repeat-password"
        name="repeat-password"
        required
        fullWidth
        size="small"
        margin="dense"
        value={repeatedPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRepeatedPassword(event.target.value)
        }}
        error={!checkPasswords()}
        helperText={!checkPasswords() && "Passwords do not match"}
      />
      <TextField
        label="Phone Number"
        type="phone"
        id="phone"
        name="phone"
        required
        fullWidth
        size="small"
        margin="dense"
        value={phone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhone(event.target.value)
        }}
      />
      <TextField
        label="Address"
        type="address"
        id="address"
        name="address"
        required
        fullWidth
        size="small"
        margin="dense"
        value={address}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAddress(event.target.value)
        }}
      />
      {tab === "2" && (
        <TextField
          label="URL"
          type="url"
          id="url"
          name="url"
          required
          fullWidth
          size="small"
          margin="dense"
          value={url}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUrl(event.target.value)
          }}
        />
      )}
      <LoadingButton color="secondary" component="label" loading={loading}>
        Upload Photo
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          style={{ display: "none" }}
          onChange={handleUploadProfilePicture}
        />
      </LoadingButton>

      <Link href="/" variant="body2">
        Privacy Policy
      </Link>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        loading={loading}
        disabled={
          !name ||
          !email ||
          !password ||
          !repeatedPassword ||
          !phone ||
          !address ||
          !checkPasswords()
        }
        sx={{
          mt: 3,
          mb: 2,
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Sign up
      </LoadingButton>
    </Box>
  )
}
