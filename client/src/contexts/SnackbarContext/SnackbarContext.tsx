import React from "react"
import { AlertColor } from "@mui/material"

type SnackbarContextType = {
  showSnackBarWithError: (error: unknown) => void
  showSnackBarWithMessage: (message: string, severity: AlertColor) => void
  handleClose: () => void
}

export const SnackbarContext = React.createContext<SnackbarContextType>({
  showSnackBarWithError: () => {},
  showSnackBarWithMessage: () => {},
  handleClose: () => {},
})
