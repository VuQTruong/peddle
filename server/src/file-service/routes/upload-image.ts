import express from 'express';
import cloudinary from 'cloudinary';
import uploadImage from '../../middlewares/multer';
import { removeFiles } from '../../utilities/file-util';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();
const upload = uploadImage.array('file', 20);

router.post('/api/images', currentUser, requireAuth, (req: any, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new BadRequestError(err.message));
    }

    if (!req.files || req.files.length === 0) {
      return next(new BadRequestError('No Image Attached'));
    }

    // Step 1: Upload image to a temp folder on our server and get the url of the image
    const imgFiles = req.files;

    // Step 2: Upload image to Cloudinary
    let localImgUrls: string[] = [];
    const uploadImagesPromise = imgFiles.map((file: any) => {
      localImgUrls.push(file.path);

      return cloudinary.v2.uploader.upload(file.path);
    });

    const uploadedImages = await Promise.all(uploadImagesPromise);
    const images = uploadedImages.map((image: any) => image.secure_url);

    // Step 3: Remove temperary images on our server
    removeFiles(localImgUrls);

    return res.status(200).json({
      status: '200',
      message: 'success',
      data: {
        images,
      },
    });
  });
});

export { router as uploadImage };
