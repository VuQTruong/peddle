import express from 'express';
import Category from '../../models/category';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/categories/:categoryId',
  currentUser,
  requireAuth,
  async (req, res) => {
    const categoryId = req.params.categoryId;

    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Item id is not valid');
    }

    await Category.findByIdAndDelete(categoryId);

    return res.status(204).send({
      status: '204',
      message: 'Category deleted successfully',
    });
  }
);

export { router as deleteCategoryRouter };
