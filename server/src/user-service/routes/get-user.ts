import express from 'express';
import { User } from '../../models/user';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/:userId', currentUser, requireAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    throw new ServerError('Something went wrong');
  }
});

export { router as getUserRouter };
