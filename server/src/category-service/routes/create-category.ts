import express, { Request, Response } from 'express';
import Category from '../../models/category';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [
  body('name')
    .isString()
    .trim()
    .toLowerCase()
    .isLength({ min: 2, max: 20 })
    .withMessage('Invalid category name - must be in length of 2 to 20 characters'),
];

router.post(
  '/api/categories',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {

    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1); // capitalize

    const existingCategory = await Category.findOne({name: req.body.name});
    if(existingCategory){
      return res.status(200).send({
        status: '200',
        message: 'Category already exists',
        data: {
          category: existingCategory 
        },
      });
    }

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
