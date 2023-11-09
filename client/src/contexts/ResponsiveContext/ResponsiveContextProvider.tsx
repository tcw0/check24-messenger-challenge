import React from "react"
import { useMediaQuery } from "@mui/material"
import { ResponsiveContext } from "./ResponsiveContext"

export function ResponsiveContextProvider(props: {
  children: React.ReactNode
}) {
  const { children } = props

  const isSmallScreen = useMediaQuery("(max-width:900px)")

  const value = React.useMemo(() => {
    return {
      isSmallScreen,
    }
  }, [isSmallScreen])

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  )
}
