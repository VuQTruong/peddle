import express, { Request, NextFunction, Response } from "express";
import Item from "../../models/item";
import { BadRequestError, ServerError } from "../../errors";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { User } from "../../models/user";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

const validations = [param('itemId').isMongoId().withMessage('itemId not in Mongo Id form')]

router.delete(
  "/api/items/:itemId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req : Request, res: Response, next: NextFunction) => {
    const itemId = req.params.itemId;

    const item = await Item.findById(itemId);
    if (!item) {
      return next(new BadRequestError("Item not found"));
    }

    // Checking if the user requesting delete is the one that own the item
    if (item?.postedBy.toString() === req.currentUser?.id) {
      await Item.findByIdAndDelete(itemId);

      // Update postedItems
      const userId = req.currentUser?.id;
      const user = await User.findById(userId);

      if (!user) {
        return next(new ServerError("Database out of sync"));
      }

      user!.postedItems = user!.postedItems.filter(
        (id) => id.toString() !== itemId
      );

      await user!.save();

      return res.status(200).send({
        status: "200",
        message: "Success",
      });
    } else {
      return res.status(403).send({
        status: "403",
        message: "You are not allowed to delete this item",
      });
    }
  }
);

export { router as deleteItemRouter };
