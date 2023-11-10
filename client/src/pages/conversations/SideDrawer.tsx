import React, { useState, FormEvent } from "react"

import {
  IconButton,
  Typography,
  useTheme,
  Stack,
  InputBase,
  Drawer,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"

import SearchIcon from "@mui/icons-material/Search"
import SendIcon from "@mui/icons-material/Send"

// import { SnackbarContext } from "../../contexts/SnackbarContext/SnackbarContext"
// import { AuthContext } from "../../contexts/AuthContext/AuthContext"
// import axios from "axios"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#111111",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}))

function SideDrawer() {
  const [search, setSearch] = useState("")
  // const [searchResults, setSearchResults] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [loadingChat, setLoadingChat] = useState()
  const [openDrawer, setOpenDrawer] = useState(false)

  // const snackbarContext = React.useContext(SnackbarContext)
  // const authContext = React.useContext(AuthContext)
  const theme = useTheme()

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault()
    // if (!search) {
    //   snackbarContext.showSnackBarWithMessage(
    //     "Please Enter something in search",
    //     "warning"
    //   )
    //   return
    // }
    // try {
    //   setLoading(true)
    //   if (!authContext.authToken) {
    //     snackbarContext.showSnackBarWithMessage(
    //       "Please Login to Search",
    //       "warning"
    //     )
    //     return
    //   }
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${authContext.authToken}`,
    //     },
    //   }
    //   const { data } = await axios.get(
    //     `/api/user/serviceprovider?search=${search}`,
    //     config
    //   )
    //   console.log("Get successful", data)
    //   setSearchResults(data)
    // } catch (error) {
    //   snackbarContext.showSnackBarWithError(error)
    // }
    // setLoading(false)
  }

  return (
    <>
      <IconButton
        sx={{
          width: "max-content",
          color: theme.palette.text.primary,
        }}
        onClick={() => setOpenDrawer((val) => !val)}
      >
        <SearchIcon sx={{ height: 40, width: 40 }} />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer((val) => !val)}>
        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
          <Typography variant="h5">Search Service Providers</Typography>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
            component="form"
            onSubmit={handleSearch}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton disabled={!search} type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}

export default SideDrawer
