import cloudinary from 'cloudinary';
import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

const validations = [body('imageUrl').isString()];

router.delete(
  '/api/images',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { imageUrl } = req.body;

    if (imageUrl === '') {
      throw new BadRequestError('No Image Selected!');
    }

    const public_id = imageUrl.split('/').pop().split('.')[0];

    await cloudinary.v2.uploader.destroy(public_id);

    return res.status(200).json({
      status: '200',
      message: 'Success',
    });
  }
);

export { router as deleteImage };
