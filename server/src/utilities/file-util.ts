import fs from 'fs';
import { BadRequestError } from '../errors/bad-request-error';

export const removeFiles = (paths: string[]) => {
  paths.forEach((path) => {
    fs.unlink(path, (err) => {
      if (err) {
        throw new BadRequestError('No Such File or Directory!');
      }
    });
  });
};
