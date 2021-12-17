import express from "express";
import Chat from "../../models/chat";

import { BadRequestError, ServerError } from "../../errors";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

//Just using this route to clear all chats for testing
const router = express.Router();

router.delete(
  "/api/chat/:chatId", 
  currentUser, 
  requireAuth, 
  async (req, res) => {
  
  const chatId = req.params.chatId;

  console.log(chatId);

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new BadRequestError("Chat not found");
  }

  await Chat.findByIdAndDelete(chatId);

  return res.status(200).send({
    status: "200",
    message: "Chat deleted successfully",
  });
});

export { router as deleteChatRouter };
