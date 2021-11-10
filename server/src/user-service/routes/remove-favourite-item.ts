import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { param } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

const validations = [param('itemId').isMongoId().withMessage('Item id is not in valid MongodId format')];

router.delete(
  "/api/users/favourite/:itemId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const itemId = req.params.itemId;

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
