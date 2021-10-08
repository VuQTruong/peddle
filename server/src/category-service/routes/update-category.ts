import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import Category from '../../models/category';
const router = express.Router();

const validations = [body('name').isString()];

router.patch(
  '/api/categories/:categoryId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.categoryId;
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).send({
        status: '200',
        message: 'Category updated successfully',
        data: {
          category: updatedCategory,
        },
      });
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as updateCategoryRouter };
