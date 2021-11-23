import express, { NextFunction, Request, Response } from "express";
import Chat from "../../models/chat";
import { param } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors";

const router = express.Router();

const validations = [
  param("chatId").isMongoId().withMessage("ChatId is not valid MongoId"),
];

router.get(
  "/api/chat/:chatId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const chatId = req.params.chatId;
    const chats = await Chat.findById(chatId);

    if (!chats) {
      return next(new BadRequestError("chat not found"));
    }

    return res.status(200).send({
      status: "200",
      message: "Success",
      data: {
        chats,
      },
    });
  }
);

export { router as getChatsRouter };
