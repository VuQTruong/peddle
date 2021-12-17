import express, { Request, Response, NextFunction } from 'express';
import Item from '../../models/item';
import { User } from '../../models/user';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors';

const router = express.Router();

const validations = [
  body('name').isString().not().isEmpty().withMessage('Item name not valid'),
  body('category').isString().not().isEmpty().withMessage('Category not valid'),
  body('images').isArray().withMessage('Invalid images'),
  body('price').isNumeric().withMessage('Price not valid'),
  body('description').isString().not().isEmpty().withMessage('Description not valid'),
];

router.post(
  '/api/items',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser?.id;
    const itemInfo = {
      ...req.body,
      postedBy: userId,
    };
    
    // Update user's postedItems
    const user = await User.findById(userId);
    if(!user){
      return next(new ServerError('Database out of sync'));
    }

    const newItem = await Item.create(itemInfo);

    user!.postedItems.push(newItem._id);
    await user!.save();

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
