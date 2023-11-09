import React, { useEffect } from "react"
import Cookies from "js-cookie"
import { AuthContext } from "./AuthContext"

export function AuthContextProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [authToken, setAuthToken] = React.useState<string | undefined>(
    undefined
  )
  const [userId, setUserId] = React.useState<string | undefined>(undefined)
  const [userName, setUserName] = React.useState<string | undefined>(undefined)
  const [userPicture, setUserPicture] = React.useState<string | undefined>(
    undefined
  )
  const [userType, setUserType] = React.useState<string | undefined>(
    undefined
  )

  const [openLogin, setOpenLogin] = React.useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      setAuthToken(token)
    }
  }, [authToken])

  useEffect(() => {
    const id = Cookies.get("userId")
    if (id) {
      setUserId(id)
    }
  }, [userId])

  useEffect(() => {
    const name = Cookies.get("userName")
    if (name) {
      setUserName(name)
    }
  }, [userName])

  useEffect(() => {
    const pictureUrl = Cookies.get("userPictureUrl")
    if (pictureUrl) {
      setUserPicture(pictureUrl)
    }
  }, [userPicture])

  const login = (
    authToken: string | undefined,
    userId: string | undefined,
    userName: string | undefined,
    userPicture: string | undefined,
    rememberMe: boolean,
    userType: string | undefined
  ) => {
    console.log("login")
    setAuthToken(authToken)
    if (authToken) {
      Cookies.set("token", authToken, { expires: rememberMe ? 7 : undefined })
    }
    setUserId(userId)
    if (userId) {
      Cookies.set("userId", userId, { expires: rememberMe ? 7 : undefined })
    }
    setUserName(userName)
    if (userName) {
      Cookies.set("userName", userName, { expires: rememberMe ? 7 : undefined })
    }
    setUserPicture(userPicture)
    if (userPicture) {
      Cookies.set("userPictureUrl", userPicture, {
        expires: rememberMe ? 7 : undefined,
      })
    }
    setUserType(userType)
    if (userType) {
      Cookies.set("userType", userType, {
        expires: rememberMe ? 7 : undefined,
      })
    }
  }

  const logout = () => {
    setAuthToken(undefined)
    Cookies.remove("token")
    setUserId(undefined)
    Cookies.remove("userId")
    setUserName(undefined)
    Cookies.remove("userName")
    setUserPicture(undefined)
    Cookies.remove("userPictureUrl")
    setUserType(undefined)
    Cookies.remove("userType")
  }

  const value = React.useMemo(() => {
    return {
      authToken,
      userId,
      userName,
      userPicture,
      userType,
      openLogin,
      login,
      logout,
      setOpenLogin,
    }
  }, [authToken, userId, userName, userPicture, userType, openLogin])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
