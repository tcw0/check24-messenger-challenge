import { Router } from "express"
import { createNewUser, authUser } from "../controllers/userController"

const userRouter = () => {
  const router = Router()

  router.post("/user/register", createNewUser)
  router.post("/user/login", authUser)

  return router
}

export default userRouter
