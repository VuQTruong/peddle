import express, { NextFunction, Request, Response } from 'express';
import Item from '../../models/item';
import { body, param } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { NotAuthorizedError } from '../../errors';

const router = express.Router();

const validations = [
  param('itemId').isMongoId().withMessage('Item Id is in invalid format'),
];

router.patch(
  '/api/items/:itemId/increment-matches',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);

    if (!item) {
      return next(new BadRequestError('Bad request - item doesn not exist'));
    }

    if (item?.postedBy.toString() === req.currentUser?.id) {
      return next(new NotAuthorizedError());
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId, {
        ...item,
        matches: ++item.matches ,
      },{
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return next(new BadRequestError('Item not found'));
    }

    return res.status(200).send({
      status: '200',
      message: 'Item updated successfully',
      data: {
        item: updatedItem,
      },
    });
  }
);

export { router as incrementMatchesRouter };
