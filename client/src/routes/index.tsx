import {
  Suspense,
  lazy,
  LazyExoticComponent,
  PropsWithoutRef,
  ComponentType,
} from "react"
import { Navigate, useRoutes } from "react-router-dom"

// layouts
import DashboardLayout from "../layouts/dashboard"

// config
import { DEFAULT_PATH } from "../config"
import LoadingScreen from "../components/LoadingScreen"

const Loadable =
  <P extends object>(Component: LazyExoticComponent<ComponentType<P>>) =>
  (props: PropsWithoutRef<P>) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    )
  }

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <Homepage/>,
      children: [
        {
          path: "login",
          element: <LoginSignup openLogin={true} setOpenLogin={() => false} />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ])
}

const GeneralApp = Loadable(lazy(() => import("../pages/dashboard/GeneralApp")))
const Page404 = Loadable(lazy(() => import("../pages/Page404")))
const Homepage = Loadable(lazy(() => import("../pages/auth/Homepage")))
const LoginSignup = Loadable(lazy(() => import("../pages/auth/LoginSignup")))
