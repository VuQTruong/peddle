import express from 'express';
import { User } from '../../models/user';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/:userId/posts',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const postItems = await User.findById(userId)
        .select('postedItems')
        .populate('postedItems');

      return res.status(200).send({
        status: '200',
        message: 'Success',
        data: {
          items: postItems?.postedItems,
        },
      });
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as getPostItemsRouter };
