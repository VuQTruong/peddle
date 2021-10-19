import express from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/:userId/purchased',
  currentUser,
  requireAuth,
  async (req, res) => {
    const userId = req.params.userId;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

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

export { router as getPurchasedListRouter };
