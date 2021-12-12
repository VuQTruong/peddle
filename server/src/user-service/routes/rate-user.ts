
import express, { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [
    param('userId').isMongoId().withMessage('User id is not in valid MongodId format'),
    param('rating').isNumeric().withMessage('Rating must be numeric'),
];

router.post('/api/users/:userId/rating/:rating', currentUser, requireAuth, validations, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  if (userId === req.currentUser?.id)
    throw new BadRequestError("Can't rate user themselves.");

  const rating = parseFloat(req.params.rating);
  if(rating < 1 || rating > 5)
    throw new BadRequestError("Rating must be 0 - 5");

  const user = await User.findById(userId);
  if (!user) 
    throw new BadRequestError("User not found");
  

  user.numRates = user.numRates + 1;
  user.totalRatings = user.totalRatings + rating;
  const avgRating = user.totalRatings / user.numRates;
  user.rating = Math.round(avgRating * 10) / 10; // 4.3948 => 4.3

  user.save();

    return res.status(200).send({
      status: "200",
      message: "Success",
      data: {
        user,
      },
    });
  }
);

export { router as rateUserRouter };
