import express from 'express';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/users/:userId/favourite',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const favouriteItems = await User.findById(userId)
        .select('favouriteItems')
        .populate('favouriteItems');

      return res.status(200).send({
        status: '200',
        message: 'Success',
        data: {
          results: favouriteItems?.favouriteItems.length,
          items: favouriteItems?.favouriteItems,
        },
      });
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as getFavouriteItemsRouter };
