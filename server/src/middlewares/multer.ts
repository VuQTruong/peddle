import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { BadRequestError } from '../errors/bad-request-error';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = './temp';
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExt);
    let fileName = baseName + '-' + Date.now() + fileExt;

    cb(null, fileName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const fileTypes = ['image/jpeg', 'image/png'];
  if (fileTypes.indexOf(file.mimetype) !== -1) {
    cb(null, true);
  } else {
    cb(new BadRequestError('File extension is not supported!'), false);
  }
};

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit to 5Mb per file
  },
  fileFilter: fileFilter,
});

export default uploadImage;
