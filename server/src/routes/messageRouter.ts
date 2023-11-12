import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import { getMessagesByConversationId, getUnreadById, postMessage, updateUnreadByConversationId } from "../controllers/messageController"

const messageRouter = () => {
  const router = Router()

  router.use("/messages", protect)
  router.get("/messages/:conversationId", getMessagesByConversationId)
  router.post("/messages", postMessage)
  router.use("/messages/unread", protect)
  router.get("/messages/unread/:conversationId", getUnreadById)
  router.put("/messages/unread/:conversationId", updateUnreadByConversationId)

  return router
}

export default messageRouter
