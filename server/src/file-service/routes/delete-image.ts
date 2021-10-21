import cloudinary from 'cloudinary';
import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../errors';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.delete(
  '/api/images/:imageName',
  currentUser,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const public_id = req.params.imageName;

    try {
      await cloudinary.v2.uploader.destroy(public_id);
    } catch (err) {
      return new ServerError('Something went wrong');
    }

    return res.status(200).json({
      status: '200',
      message: 'Success',
    });
  }
);

export { router as deleteImage };
