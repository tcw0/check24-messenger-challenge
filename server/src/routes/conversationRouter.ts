import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import { getConversations, postConversation } from "../controllers/conversationController"

const conversationRouter = () => {
  const router = Router()

  router.use("/conversations", protect)
  router.get("/conversations", getConversations)
  router.post("/conversations", postConversation)

  return router
}

export default conversationRouter
