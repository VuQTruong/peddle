import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();
const validations = [body('itemId').isMongoId().withMessage('Invalid item Id')];

router.post(
  '/api/users/favourite',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.body.itemId;
    const userId = req.currentUser?.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new BadRequestError('User id is not valid'));
    }

    if (user?.favouriteItems.includes(itemId)) {
      return res.status(200).send({
        status: '200',
        message: 'Item already exists',
      });
    }

    user.favouriteItems.push(itemId);
    await user.save();

    return res.status(200).send({
      status: '200',
      message: 'Favourite Item added successfully',
    });
  }
);

export { router as addFavouriteItemRouter };
