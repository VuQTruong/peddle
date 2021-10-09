import express from 'express';
import Item from '../../models/item';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const router = express.Router();

router.delete(
  '/api/items/:itemId',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const item = await Item.findById(itemId);

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

        return res.sendStatus(204);
      } else {
        return res.status(403).send({
          status: '403',
          message: 'You are not allowed to delete this item',
        });
      }
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as deleteItemRouter };
