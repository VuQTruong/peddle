import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { comparePassword } from '../../utilities/password-util';

const router = express.Router();
const validations = [
  body('email').isEmail(),
  body('password').trim().notEmpty(),
];

router.post(
  '/api/auth/signin',
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await comparePassword(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 600, // 10 minutes
      }
    );

    // store jwt in a cookie
    req.session = {
      jwt: userJwt,
    };

    res
      .status(200)
      .send({ status: 200, message: 'user signed in', data: existingUser });
  }
);

export { router as signinRouter };
