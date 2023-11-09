import React from "react"

type ResponsiveContextType = {
  isSmallScreen: boolean
}

export const ResponsiveContext = React.createContext<ResponsiveContextType>({
  isSmallScreen: false,
})
