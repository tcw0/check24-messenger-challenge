import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import {
  getConversations,
  postConversation,
  acceptConversation,
  rejectConversation,
  completeConversation,
  reviewConversation,
  deleteConversation
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
  router.use("/conversations/complete", protect)
  router.put("/conversations/complete/:conversationId", completeConversation)
  router.use("/conversations/review", protect)
  router.put("/conversations/review/:conversationId", reviewConversation)
  router.use("/conversations/delete", protect)
  router.put("/conversations/delete/:conversationId", deleteConversation)

  return router
}

export default conversationRouter
