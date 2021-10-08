import express, { Request, Response } from 'express';
import Item from '../../models/item';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
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
    try {
      const itemId = req.params.itemId;
      const item = await Item.findById(itemId);

      if (item?.postedBy === req.currentUser?.id) {
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
        return res.send(403).send({
          status: '403',
          message: 'You are not allowed to update this item',
        });
      }
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as updateItemRouter };
