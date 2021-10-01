import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user"; 
import { comparePassword } from "../../utilities/password-util";

const router = express.Router();

router.post(
  "/api/auth/signin",
  [body("email").isEmail(), body("password").trim().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      // let existingUser = {id:"abc", email: "test@test.com", password: "abc.def"};

      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }

      const passwordMatch = await comparePassword(
        existingUser.password,
        password
      );

      if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials");
      }

    // genrate json web token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 600  // 10 minutes
      }
    );

    // store jwt in a cookie
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send({status: "200", message:"user signed in", data: existingUser});
  }
);

export { router as signinRouter };

function SignOptions(arg0: { id: string; email: string; }, arg1: string, options: any, SignOptions: any, arg4: {}) {
  throw new Error("Function not implemented.");
}
