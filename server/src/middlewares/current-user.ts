import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  lat: number;
  lng: number;
  postalCode: string;
  isPremiumMember: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.ACCESS_TOKEN_SECRET!
    ) as UserPayload; // extract info from jwt
    req.currentUser = payload;
  } catch (err: any) {
    const notAuthorized = new NotAuthorizedError();
    notAuthorized.reason = `Not authorized - ${err.message}`;
    throw notAuthorized;
  }

  next();
};
