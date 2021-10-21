import express from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/users/favourite-items',
  currentUser,
  requireAuth,
  async (req, res) => {
    const userId = req.currentUser?.id;

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
  }
);

export { router as getFavouriteItemsRouter };
