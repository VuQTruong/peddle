import {Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) =>{
    const isAuthorized = false;
    if(!isAuthorized){
        throw new NotAuthorizedError();
    }

    next();
}