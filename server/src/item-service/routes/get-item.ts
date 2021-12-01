import express, { NextFunction, Request, Response } from "express";
import Item from "../../models/item";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

const validations = [param('itemId').isMongoId().withMessage('itemId is not valid mongo Id')]

router.get("/api/items/:itemId", 
currentUser, 
requireAuth, 
validations,
validateRequest,
async (req : Request, res: Response, next: NextFunction) => {

  const itemId = req.params.itemId;
  const item = await Item.findById(itemId).populate(
    "postedBy",
    "firstName lastName photo lat lng postedItems"
  );

  if (!item) {
    return next(new BadRequestError("Item not found"));
  }

  // Increase the number of views
  await Item.findByIdAndUpdate(
    itemId,
    {
      $inc: {
        views: 1,
      },
    },
    { new: true }
  );

  return res.status(200).send({
    status: "200",
    message: "Success",
    data: {
      item,
    },
  });
});

export { router as getItemRouter };
