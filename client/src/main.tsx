import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { CssBaseline } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import theme from "./Theme"
import "./index.css"
import { SnackbarContextProvider } from "./contexts/SnackbarContext/SnackbarContextProvider"
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider"
import { ResponsiveContextProvider } from "./contexts/ResponsiveContext/ResponsiveContextProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ResponsiveContextProvider>
        <ThemeProvider theme={theme}>
          <SnackbarContextProvider>
            <BrowserRouter>
              <CssBaseline />
              <App />
            </BrowserRouter>
          </SnackbarContextProvider>
        </ThemeProvider>
      </ResponsiveContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
