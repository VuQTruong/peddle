import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

const validations = [body('itemId').isString()];

router.patch(
  '/api/users/:userId/favourite/remove',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const itemId = req.body.itemId;
    const userId = req.params.userId;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

    const updatedUser = await User.findById(userId);

    if (updatedUser) {
      updatedUser.favouriteItems = updatedUser.favouriteItems.filter(
        (id) => id.toString() !== itemId
      );
      await updatedUser.save();

      return res.status(200).send({
        status: '200',
        message: 'Favourite Item removed successfully',
      });
    } else {
      throw new BadRequestError('User not found');
    }
  }
);

export { router as removeFavouriteItemRouter };
