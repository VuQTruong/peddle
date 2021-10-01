import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

    console.log(err);

    if(err instanceof AppError ){
         return res.status(err.statusCode).send({
            status:err.statusCode, 
            message: err.getErrorMessage() 
        });
    }

    res.status(400).send({
        status: "400",
        message: `Unexpected Error - ${err.message}`
    });
}