import express from 'express';
import Item from '../../models/item';
import { User } from '../../models/user';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors';

const router = express.Router();

router.get('/api/items', currentUser, requireAuth, async (req, res) => {
  // Get user seen items
  const userId = req.currentUser?.id;
  const userInfo = await User.findById(userId);
  if(!userInfo){
    throw new BadRequestError('User not found')
  }
  const postedItems = userInfo.postedItems;

  // Get items
  const items = await Item.find({
    _id: {
      $nin: [...postedItems]
    },
  }).limit(10);

  return res.status(200).send({
    status: '200',
    message: 'Success',
    data: {
      items,
    },
  });
});

export { router as getMultiItemsRouter };
