import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      // Check24 dark blue
      main: "#16376f",
      contrastText: "white",
    },
    secondary: {
      // Check24 yellow
      main: "#f3b243",
      contrastText: "#152944",
    },
  },
})

export default theme
