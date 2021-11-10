import express from "express";
import "express-async-errors";
import cloudinary from "cloudinary";

import dotenv from "dotenv";

import {
  signinRouter,
  signoutRouter,
  signUpRouter,
  currentUserRouter,
} from "./auth-service/routes";
import {
  getUserRouter,
  getPostItemsRouter,
  getPurchasedListRouter,
  updateUserRouter,
  updateSeenItemsRouter,
  addFavouriteItemRouter,
  removeFavouriteItemRouter,
  getFavouriteItemsRouter,
} from "./user-service/routes";
import {
  createCategoryRouter,
  getAllCategoriesRouter,
  updateCategoryRouter,
  deleteCategoryRouter,
} from "./category-service/routes";
import {
  getMultiItemsRouter,
  getItemRouter,
  createItemRouter,
  updateItemRouter,
  deleteItemRouter,
} from "./item-service/routes";
import {
  getChatsRouter,
  createChatRouter,
  updateChatRouter,
  getChatsByUserRouter,
} from "./chat-service/routes";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";
import { deleteImage, uploadImage } from "./file-service/routes";

dotenv.config();

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // cookie will only be available via a https call
  })
);

app.use(express.urlencoded({ extended: true }));

/* Config Cloudinary */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Home Route */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is ready",
  });
});

/* Routes */
// Auth Services
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signoutRouter);
app.use(signinRouter);

// File Routes
app.use(uploadImage);
app.use(deleteImage);

// User Services
app.use(getUserRouter);
app.use(getPostItemsRouter);
app.use(getPurchasedListRouter);
app.use(updateUserRouter);
app.use(updateSeenItemsRouter);
app.use(addFavouriteItemRouter);
app.use(removeFavouriteItemRouter);
app.use(getFavouriteItemsRouter);

// Category Services
app.use(createCategoryRouter);
app.use(getAllCategoriesRouter);
app.use(updateCategoryRouter);
app.use(deleteCategoryRouter);

// Item Services
app.use(getMultiItemsRouter);
app.use(getItemRouter);
app.use(createItemRouter);
app.use(updateItemRouter);
app.use(deleteItemRouter);

app.use(getChatsRouter);
app.use(updateChatRouter);
app.use(createChatRouter);
app.use(getChatsByUserRouter);

/* Unhandled Routes */
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
