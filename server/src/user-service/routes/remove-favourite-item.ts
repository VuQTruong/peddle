import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { body } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

const validations = [body('itemId').isMongoId()];

router.delete(
  "/api/users/:userId/favourite",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const itemId = req.body.itemId;
    const userId = req.params.userId;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError("Item id is not valid");
    }

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError("User id is not valid");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (!user.favouriteItems.includes(itemId)) {
      throw new BadRequestError("Item does not exist in favourite items");
    }

    user.favouriteItems = user.favouriteItems.filter(
      (id) => id.toString() !== itemId
    );
    await user.save();

    return res.status(200).send({
      status: "200",
      message: "Favourite Item removed successfully",
    });
  }
);

export { router as removeFavouriteItemRouter };
