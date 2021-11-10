import express, { Request, Response } from "express";
import Chat from "../../models/chat";
import { body } from "express-validator";
import { ServerError } from "../../errors/server-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/chat",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
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
