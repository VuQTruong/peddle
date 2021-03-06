import express from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
const router = express.Router();


router.get(
  '/api/users/post-items',
  currentUser,
  requireAuth,
  async (req, res) => {
    const userId = req.currentUser?.id;

    const postItems = await User.findById(userId)
      .select('postedItems')
      .populate('postedItems');

    if(!postItems){
      throw new BadRequestError('User not found')
    }

    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        items: postItems?.postedItems,
      },
    });
  }
);

export { router as getPostItemsRouter };
