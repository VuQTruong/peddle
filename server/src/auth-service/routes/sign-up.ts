import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

interface User {
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  lat: number;
  lng: number;
  postalCode: string;
  isPremiumMember: boolean;
  dislikedItemIds: string[];
}

const validations = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("firstName").isString().trim().not().isEmpty(),
  body("lastName").isString().trim().not().isEmpty(),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  body("postalCode").isString().trim().isLength({ min: 7, max: 7 }).isPostalCode('CA'),
  body("lat").isNumeric(),
  body("lng").isNumeric(),
  body("dislikedItemIds").isArray(),
  // body("photo").trim().isBase64()
];

router.post("/api/auth/signup", validations, validateRequest, async (req: Request, res: Response) => {
    const newUser: User = req.body;

    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build(newUser);
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET!
    );

    // store jwt in a cookie
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({
      status: 201,
      message:"success",
      data: user,
    });
  }
);

export { router as signUpRouter };
