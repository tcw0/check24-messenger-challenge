import {
  Suspense,
  lazy,
  LazyExoticComponent,
  PropsWithoutRef,
  ComponentType,
} from "react"
import { Navigate, useRoutes } from "react-router-dom"

// layouts
import SideNav from "../components/SideNav"

// config
import { DEFAULT_PATH } from "../config"
import LoadingScreen from "../components/LoadingScreen"

const Loadable =
  <P extends object>(Component: LazyExoticComponent<ComponentType<P>>) =>
  (props: PropsWithoutRef<P>) => {
    return (
      <Suspense fallback={<LoadingScreen open={true} />}>
        <Component {...props} />
      </Suspense>
    )
  }

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <Homepage />,
      children: [
        {
          path: "login",
          element: <LoginSignup openLogin={true} setOpenLogin={() => false} />,
        },
      ],
    },
    {
      path: "/",
      element: <SideNav />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <ChatPage /> },
        { path: "conversation", element: <ChatBox /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ])
}

const ChatPage = Loadable(lazy(() => import("../pages/conversations/ChatPage")))
const Page404 = Loadable(lazy(() => import("../pages/Page404")))
const Homepage = Loadable(lazy(() => import("../pages/auth/Homepage")))
const LoginSignup = Loadable(lazy(() => import("../pages/auth/LoginSignup")))
const ChatBox = Loadable(lazy(() => import("../pages/conversations/ChatBox")))
