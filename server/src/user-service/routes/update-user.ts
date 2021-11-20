import express, { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { hashPassword } from '../../utilities/password-util';
const router = express.Router();

const validations = [
  body('firstName').isString().isLength({min: 1}).optional().withMessage("invalid first name"),
  body('lastName').isString().isLength({min: 1}).optional().withMessage("invalid last name"),
  body('photo').isString().optional().withMessage("invalid value for photo"),
  body('lat').isNumeric().optional().withMessage("invalid latitude value"),
  body('lng').isNumeric().optional().withMessage("invalid longitude value"),
  body("postalCode").trim().isLength({ min: 7, max: 7 }).isPostalCode('CA').optional().withMessage("invalid postal code"),
];

router.patch(
  '/api/users/current-user',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser?.id;

    if(req.body.password !== undefined) 
      req.body.password = await hashPassword(req.body.password);
    else 
      delete req.body.password;
    
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if(!updatedUser){
      return next(new BadRequestError('User not found'));
    }

    return res.status(200).send({
      status: '200',
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      },
    });
  }
);

export { router as updateUserRouter };
