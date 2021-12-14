import express from 'express';
import { User } from '../../models/user';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors';

const router = express.Router();

router.get('/api/users/sold-items', currentUser, requireAuth, async (req, res) => {
  // Get user seen items
  const userId = req.currentUser?.id;
  const userInfo = await User.findById(userId);
  if(!userInfo){
    throw new BadRequestError('User not found')
  }
  const soldItems = await User.findById(userId)
  .select('soldItems')
  .populate('soldItems');

  return res.status(200).send({
    status: '200',
    message: 'Success',
    data: {
      items: soldItems?.soldItems,
    },
  });
});

export { router as getSoldItemsRouter };
