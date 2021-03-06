import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { body, param } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import Item from '../../models/item';

const router = express.Router();

const validations = [
  body('itemId').isMongoId().withMessage("Invalid item Id(s)"),
];

router.patch(
  '/api/users/seen-items',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const itemIds = req.body.itemId;
    const userId = req.currentUser?.id;

    const updatedUser = await User.findById(userId);

    if (updatedUser) {
      updatedUser.seenItems.push(itemIds)
      await updatedUser.save();

      return res.status(200).send({
        status: '200',
        message: 'Seen Items updated successfully',
      });
    } else {
      throw new BadRequestError('User not found');
    }
  }
);

export { router as updateSeenItemsRouter };
