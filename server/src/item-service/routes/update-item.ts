import express, { NextFunction, Request, Response } from "express";
import Item from "../../models/item";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { validateRequest } from "../../middlewares/validate-request";
import { requireAuth } from "../../middlewares/require-auth";
import { NotAuthorizedError } from "../../errors";

const router = express.Router();

const validations = [
  body("name").isString().optional(),
  body("category").isString().optional(),
  body("images").isString().isArray().optional(),
  body("price").isNumeric().optional(),
  body("description").isString().optional(),
  body("isActive").isBoolean().optional(),
  body("isSold").isBoolean().optional(),
];

router.patch(
  "/api/items/:itemId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.itemId;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new BadRequestError("Item id is not valid"));
    }

    const item = await Item.findById(itemId);
    if(!item){
      return next(new BadRequestError('Bad request - item doesn not exist'))
    }

    if (item?.postedBy.toString() !== req.currentUser?.id) {
      return next(new NotAuthorizedError())
    }

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send({
      status: "200",
      message: "Item updated successfully",
      data: {
        item: updatedItem,
      },
    });
  }
);

export { router as updateItemRouter };
