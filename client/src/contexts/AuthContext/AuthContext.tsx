import React from "react"

type AuthContextType = {
  authToken: string | undefined
  userId: string | undefined
  userName: string | undefined
  userPicture: string | undefined
  userType: string | undefined
  openLogin: boolean
  login: (
    authToken: string | undefined,
    userId: string | undefined,
    userName: string | undefined,
    userPicture: string | undefined,
    rememberMe: boolean,
    userType: string | undefined
  ) => void
  logout: () => void
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = React.createContext<AuthContextType>({
  authToken: undefined,
  userId: undefined,
  userName: undefined,
  userPicture: undefined,
  userType: undefined,
  openLogin: false,
  login: () => {},
  logout: () => {},
  setOpenLogin: () => {},
})


