import express from 'express';
import { User } from '../../models/user';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/seen-items',
  currentUser,
  requireAuth,
  async (req, res) => {
    const userId = req.currentUser?.id;

    const response = await User.findById(userId)
      .select('seenItems')
      .populate('seenItems');
    console.log(response)

    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        items: response?.seenItems,
      },
    });
  }
);

export { router as getSeenItemsRouter };
