import express from 'express';
import Category from '../../models/category';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/categories/:categoryId',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      await Category.findByIdAndDelete(categoryId);

      return res.status(204).send({
        status: '204',
        message: 'Category deleted successfully',
      });
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as deleteCategoryRouter };
