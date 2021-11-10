import express, { Request, Response } from 'express';
import Item from '../../models/item';
import { User } from '../../models/user';
import { param } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors';

const router = express.Router();

const validations = [
  param('itemId').isMongoId().withMessage('Item id not in valid MongoId form'),
];

router.post(
  '/api/purchase/:itemId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const itemId = req.params.itemId;

    const item = await Item.findById(itemId);
    const user = await User.findById(userId);

    if(!item){
      throw new BadRequestError("Item not found.");
    }
    if(item.postedBy.toString() === userId){
      throw new BadRequestError("Cannot purchase item from users themselves");
    }
    if(item.isSold){
      throw new BadRequestError("Item is already sold.")
    }
    if(!user){
      throw new ServerError("Internal Server Error");
    }

    item.isSold = true;
    item.isActive = false;
    item.purchasedBy = req.currentUser!.id;
    const itemPosted = await item.save();

    user.purchasedItems.push(itemId);
    const userPosted = await user.save();

    if(!userPosted || !itemPosted) {
      throw new ServerError("internal Server Error");
    }

    return res.status(200).send({
      status: '200',
      message: 'Order placed',
      data: {
        item
      },
    });
  }
);

export { router as purchaseRoute };
