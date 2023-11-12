import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import {
  getConversations,
  postConversation,
  acceptConversation,
  rejectConversation
} from "../controllers/conversationController"

const conversationRouter = () => {
  const router = Router()

  router.use("/conversations", protect)
  router.get("/conversations", getConversations)
  router.post("/conversations", postConversation)
  router.use("/conversations/accept", protect)
  router.put("/conversations/accept/:conversationId", acceptConversation)
  router.use("/conversations/reject", protect)
  router.put("/conversations/reject/:conversationId", rejectConversation)

  return router
}

export default conversationRouter
