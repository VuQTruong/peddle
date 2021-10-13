import express from 'express';
import Item from '../../models/item';
import { BadRequestError} from '../../errors/index';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const router = express.Router();

router.delete(
  '/api/items/:itemId',
  currentUser,
  requireAuth,
  async (req, res) => {
    const itemId = req.params.itemId;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

    const item = await Item.findById(itemId);
    if (!item){
      throw new BadRequestError("Item not found");
    }
    // Checking if the user requesting delete is the one that own the item

    if (item?.postedBy.toString() === req.currentUser?.id) {
      await Item.findByIdAndDelete(itemId);

      // Update postedItems
      const userId = req.currentUser?.id;
      const user = await User.findById(userId);
      if (user) {
        user.postedItems = user.postedItems.filter(
          (id) => id.toString() !== itemId
        );
        await user.save();
      }

      return res.status(200).send({
        status: '200',
        message: 'Success',
      });
    } else {
      return res.status(403).send({
        status: '403',
        message: 'You are not allowed to delete this item',
      });
    }
  }
);

export { router as deleteItemRouter };
