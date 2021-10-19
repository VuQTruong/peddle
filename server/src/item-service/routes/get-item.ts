import express from "express";
import Item from "../../models/item";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

const validations = [param('itemId').isMongoId().withMessage('itemId not in Mongo Id form')]

router.get("/api/items/:itemId", 
currentUser, 
requireAuth, 
validations,
validateRequest,
async (req, res, next) => {

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
