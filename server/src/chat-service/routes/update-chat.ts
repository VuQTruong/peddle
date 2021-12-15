import express, { Request, Response, NextFunction } from "express";
import { param, body } from "express-validator";
import { BadRequestError } from "../../errors";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import Chat from "../../models/chat";

const router = express.Router();

const validations = [
  param("chatId").isMongoId().withMessage("ChatId is not valid MongoId"),
  body("sender").isMongoId().withMessage("Sender id not in valid MongoId form"),
  body("receiver")
    .isMongoId()
    .withMessage("Receiver id not in valid MongoId form"),
  body("isBlocked").isBoolean().optional().withMessage("Invalid isBlocked"),
  body("itemId").isMongoId().withMessage("Item id not in valid MongoId form"),
];

router.patch(
  "/api/chat/:chatId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(new BadRequestError("Bad request - chat does not exist"));
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedChat) {
      return next(new BadRequestError("Chat not found"));
    }

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
