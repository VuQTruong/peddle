import express, { NextFunction, Request, Response } from 'express';
import Item from '../../models/item';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [
  param('userId').isMongoId().withMessage('userId not is not a valid MongoId'),
];

router.get(
  '/api/items/user/:userId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const items = await Item.find({'postedBy': userId});
    if (!items) {
      return next(new BadRequestError('Items not found'));
    }


    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        items,
      },
    });
  }
);

export { router as getUserItemsRouter };
