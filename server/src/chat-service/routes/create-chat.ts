import express, { Request, Response, NextFunction } from "express";
import Chat from "../../models/chat";
import { body } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors";

const router = express.Router();

const validations = [
  body("sender").isMongoId().withMessage("Sender id not in valid MongoId form"),
  body("receiver")
    .isMongoId()
    .withMessage("Receiver id not in valid MongoId form"),
  body("itemId").isMongoId().withMessage("Item id not in valid MongoId form"),
];

router.post(
  "/api/chat",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const chatBody = req.body;
    //get sender and receiver from the request body
    const sender = chatBody.sender;
    const receiver = chatBody.receiver;
    const item = chatBody.itemId;

    //if sender and receiver are same, throw an error
    if (sender == receiver) {
      return res
        .status(400)
        .send({ status: "400", message: "Can't send message to yourself" });
    }

    //check if chat already exists for these users
    const chatForUser = await (
      await Chat.find()
    ).filter(
      (chat) =>
        (chat.sender == sender || chat.receiver == sender) &&
        (chat.sender == receiver || chat.receiver == receiver) &&
        chat.itemId == item
    );

    //if chat exists between these users, throw an error
    if (chatForUser.length > 0) {
      return res.status(400).send({
        status: "400",
        message:
          "Chat between sender and receiver already exists for this particular item.",
      });
    }

    //get the userId from messages array and check if it is valid and matches with the sender or receiver
    const userId = chatBody.messages[0].userId;

    if (
      !userId.match(/^[0-9a-fA-F]{24}$/) ||
      (userId != sender && userId != receiver)
    ) {
      throw new BadRequestError("User id is not valid");
    }

    //if everything is okay, create the chat
    const chat = await Chat.create(req.body);

    return res.status(201).send({
      status: "201",
      message: "Chat created successfully",
      data: {
        chat,
      },
    });
  }
);

export { router as createChatRouter };
