import express, { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [param('userId').isMongoId().withMessage('User id is not in valid MongodId format')];

router.get('/api/users/id/:userId', currentUser, requireAuth, validations, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

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
