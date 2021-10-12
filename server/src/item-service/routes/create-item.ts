import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Item from '../../models/item';
import { User } from '../../models/user';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [
  body('name').isString(),
  body('category').isString(),
  body('images').isArray(),
  body('price').isNumeric(),
  body('description').isString(),
];

router.post(
  '/api/items',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id;
    const itemInfo = {
      ...req.body,
      postedBy: userId,
    };
    const newItem = await Item.create(itemInfo);

    // Update user's postedItems
    const user = await User.findById(userId);
    if (user) {
      user.postedItems.push(newItem._id);
      await user.save();
    }

    return res.status(201).send({
      status: '201',
      message: 'Item created successfully',
      data: {
        item: newItem,
      },
    });
  }
);

export { router as createItemRouter };
