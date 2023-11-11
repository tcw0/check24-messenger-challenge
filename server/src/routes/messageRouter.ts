import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import { getMessagesByConversationId, getUnreadById, postMessage } from "../controllers/messageController"

const messageRouter = () => {
  const router = Router()

  router.use("/messages", protect)
  router.get("/messages/unread/:conversationId", getUnreadById)
  router.get("/messages/:conversationId", getMessagesByConversationId)
  router.post("/messages", postMessage)

  return router
}

export default messageRouter
