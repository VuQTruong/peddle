import cloudinary from 'cloudinary';
import express, { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../errors';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/images/:imageName',
  currentUser,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const public_id = req.params.imageName;

    const { result } = await cloudinary.v2.uploader.destroy(public_id);

    if (result === 'ok') {
      return res.status(200).json({
        status: '200',
        message: 'Success',
        data: {
          deletedImg: public_id,
        },
      });
    } else {
      throw new BadRequestError('Image not found');
    }
  }
);

export { router as deleteImage };
