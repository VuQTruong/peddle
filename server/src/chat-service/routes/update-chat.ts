import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import Chat from "../../models/chat";

const router = express.Router();

const validations = [
  param("chatId").isMongoId().withMessage("ChatId is not valid MongoId"),
];

router.patch(
  "/api/chat/:chatId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const chatId = req.params.chatId;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, req.body, {
      new: true,
    });

    return res.status(200).send({
      status: "200",
      message: "Chat updated successfully",
      data: {
        chat: updatedChat,
      },
    });
  }
);

export { router as updateChatRouter };
