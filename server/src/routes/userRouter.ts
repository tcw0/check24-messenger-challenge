import { Router } from "express"
import {
  createNewUser,
  authUser,
  getServiceProvider,
} from "../controllers/userController"
import { protect } from "../middleware/authMiddleware"

const userRouter = () => {
  const router = Router()

  router.post("/user/register", createNewUser)
  router.post("/user/login", authUser)

  router.use("/user/serviceprovider", protect)
  router.get("/user/serviceprovider", getServiceProvider)

  return router
}

export default userRouter
