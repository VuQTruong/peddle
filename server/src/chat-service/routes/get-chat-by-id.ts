import express from "express";
import Chat from "../../models/chat";
import { ServerError } from "../../errors/server-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

router.get("/api/chat/:chatId", currentUser, requireAuth, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chats = await Chat.findById(chatId);

    return res.status(200).send({
      status: "200",
      message: "Success",
      data: {
        chats,
      },
    });
  } catch (err) {
    throw new ServerError("Something went wrong");
  }
});

export { router as getChatsRouter };
