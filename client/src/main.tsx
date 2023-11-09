import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import theme from "./Theme"
import "./index.css"
import { SnackbarContextProvider } from "./contexts/SnackbarContext/SnackbarContextProvider"
import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <SnackbarContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarContextProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
