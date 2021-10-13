import express from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/:userId', currentUser, requireAuth, async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new BadRequestError('User id is not valid');
  }

  const user = await User.findById(userId);
  if(!user){
    return next(new BadRequestError('User not found'));
  }

  return res.status(200).send({
    status: '200',
    message: 'Success',
    data: {
      user,
    },
  });
});

export { router as getUserRouter };
