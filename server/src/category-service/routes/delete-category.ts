import express, { Request, Response } from 'express';
import Category from '../../models/category';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [param('categoryId').isMongoId().withMessage('Invalid category Id')]
router.delete(
  '/api/categories/:categoryId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {

    const categoryId  = req.params.categoryId;
    const doc = await Category.findByIdAndDelete(categoryId);
    console.log('hey')
    console.log(doc)
    if(!doc){
      throw new BadRequestError('Category does not exist')
    }

    return res.status(200).send({
      status: '200',
      message: 'Category deleted successfully',
    });
  }
);

export { router as deleteCategoryRouter };
