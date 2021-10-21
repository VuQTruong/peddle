import express from 'express';
import { User } from '../../models/user';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/purchased-items',
  currentUser,
  requireAuth,
  async (req, res) => {
    const userId = req.currentUser?.id;

    const purchasedItems = await User.findById(userId)
      .select('purchasedItems')
      .populate('purchasedItems');

    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        items: purchasedItems?.purchasedItems,
      },
    });
  }
);

export { router as getPurchasedItemRouter };
