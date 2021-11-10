import express from "express";
import Chat from "../../models/chat";
import { ServerError } from "../../errors/server-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/chat/user/:userId",
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const chats = await Chat.find();

      let chatForUser = chats.filter(
        (chat) =>
          chat.user1.toString() == userId || chat.user2.toString() == userId
      );

      return res.status(200).send({
        status: "200",
        message: "Success",
        data: {
          chatForUser,
        },
      });
    } catch (err) {
      throw new ServerError("Something went wrong");
    }
  }
);

export { router as getChatsByUserRouter };
