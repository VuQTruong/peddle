import express from 'express';
import Category from '../../models/category';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/categories', currentUser, requireAuth, async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).send({
      status: '200',
      message: 'Success',
      data: {
        results: categories.length,
        categories,
      },
    });
  } catch (err) {
    throw new ServerError('Something went wrong');
  }
});

export { router as getAllCategoriesRouter };
