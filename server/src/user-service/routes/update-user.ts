import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ServerError } from '../../errors/server-error';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
const router = express.Router();

const validations = [
  body('firstName').isString().optional(),
  body('lastName').isString().optional(),
  body('photo').isString().optional(),
  body('lat').isNumeric().optional(),
  body('lng').isNumeric().optional(),
  body('postalCode').isString().optional(),
];

router.patch(
  '/api/users/:userId',
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).send({
        status: '200',
        message: 'User updated successfully',
        data: {
          user: updatedUser,
        },
      });
    } catch (err) {
      throw new ServerError('Something went wrong');
    }
  }
);

export { router as updateUserRouter };
