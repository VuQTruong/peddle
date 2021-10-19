import express, { Request, Response } from 'express';
import Category from '../../models/category';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [body('name').isString()];

router.post(
  '/api/categories',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const category = await Category.create(req.body);

    return res.status(201).send({
      status: '201',
      message: 'Category created successfully',
      data: {
        category,
      },
    });
  }
);

export { router as createCategoryRouter };
