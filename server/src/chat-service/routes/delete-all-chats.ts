import express from "express";
import Chat from "../../models/chat";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

//Just using this route to clear all chats for testing
const router = express.Router();

router.delete("/api/chat", currentUser, requireAuth, async (req, res) => {
  await Chat.deleteMany();

  return res.status(200).send({
    status: "200",
    message: "All chats deleted successfully",
  });
});

export { router as deleteChatRouter };
