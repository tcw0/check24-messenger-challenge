import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import { getUnreadById } from "../controllers/messageController"

const conversationRouter = () => {
  const router = Router()

  router.use("/messages", protect)
  router.get("/messages/unread/:conversationId", getUnreadById)

  return router
}

export default conversationRouter
