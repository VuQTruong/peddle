import express, { Request, Response } from 'express';
import Item from '../../models/item';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

const validations = [
  body('name').isString().optional(),
  body('category').isString().optional(),
  body('images').isArray().optional(),
  body('price').isNumeric().optional(),
  body('description').isString().optional(),
  body('isActive').isBoolean().optional(),
  body('isSold').isBoolean().optional(),
];

router.patch(
  '/api/items/:itemId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const itemId = req.params.itemId;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

    const item = await Item.findById(itemId);

    if (item?.postedBy.toString() === req.currentUser?.id) {
      const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).send({
        status: '200',
        message: 'Item updated successfully',
        data: {
          item: updatedItem,
        },
      });
    } else {
      return res.status(403).send({
        status: '403',
        message: 'You are not allowed to update this item',
      });
    }
  }
);

export { router as updateItemRouter };
