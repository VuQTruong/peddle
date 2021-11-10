import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import Category from '../../models/category';

const router = express.Router();

const validations = [
  body('name')
    .isString()
    .trim()
    .toLowerCase()
    .isLength({ min: 2, max: 20 })
    .withMessage('Invalid category name - must be in length of 2 to 20 characters'),
  param('categoryId').isMongoId().withMessage('Invalid category id'),
];

router.patch(
  '/api/categories/:categoryId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if(!updatedCategory){
        throw new BadRequestError('Category does not exist');
    }


    return res.status(200).send({
      status: '200',
      message: 'Category updated successfully',
      data: {
        category: updatedCategory,
      },
    });
  }
);

export { router as updateCategoryRouter };
