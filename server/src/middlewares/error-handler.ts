import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
      errors: err.getErrors(),
    });
  }

  res.status(500).send({
    status: '500',
    message: `Unexpected Error - ${err.message}`,
  });
};
