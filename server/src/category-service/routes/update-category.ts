import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import Category from "../../models/category";

const router = express.Router();

const validations = [body("name").isString()];

router.patch(
  "/api/categories/:categoryId",
  currentUser,
  requireAuth,
  validations,
  validateRequest,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError("Item id is not valid");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).send({
      status: "200",
      message: "Category updated successfully",
      data: {
        category: updatedCategory,
      },
    });
  }
);

export { router as updateCategoryRouter };
