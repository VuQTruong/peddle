import express, { NextFunction, Request, Response } from "express";
import Chat from "../../models/chat";
import { param } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

const validations = [
  param("userId").isMongoId().withMessage("UserId is not valid MongoId"),
];

router.get(
  "/api/chat/user/:userId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const chats = await Chat.find();

    let chatForUser = chats.filter(
      (chat) =>
        chat.sender?.toString() == userId || chat.receiver?.toString() == userId
    );

    if (chatForUser.length == 0) {
      return next(new BadRequestError("chat not found for this userId"));
    }

    return res.status(200).send({
      status: "200",
      message: "Success",
      data: {
        chatForUser,
      },
    });
  }
);

export { router as getChatsByUserRouter };
