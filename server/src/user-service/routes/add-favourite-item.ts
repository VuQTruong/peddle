import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [
  body('itemId').isString().not().isEmpty()
];

router.patch(
  '/api/users/:userId/favourite',
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
      throw new BadRequestError('User id is not valid');
    }

    const user = await User.findById(userId);

    if(user?.favouriteItems?.includes(itemId)){
      return res.status(200).send({
        status: '200',
        message: 'Item already exists',
      });
    }

    if (user) {
      user.favouriteItems.push(itemId);
      await user.save();

      return res.status(200).send({
        status: '200',
        message: 'Favourite Item added successfully',
      });
    } else {
      throw new BadRequestError('User id is not valid');
    }
  }
);

export { router as addFavouriteItemRouter };
