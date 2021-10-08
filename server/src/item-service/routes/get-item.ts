import express from 'express';
import Item from '../../models/item';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/items/:itemId', currentUser, requireAuth, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId).populate(
      'postedBy',
      'firstName lastName photo lat lng postedItems'
    );

    if (item) {
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
        status: '200',
        message: 'Success',
        data: {
          item,
        },
      });
    } else {
      return res.status(404).send({
        status: '404',
        message: 'Item not found',
      });
    }
  } catch (err) {
    throw new ServerError('Something went wrong');
  }
});

export { router as getItemRouter };
