import express from 'express';
import 'express-async-errors';

import dotenv from 'dotenv';

import {
  signinRouter,
  signoutRouter,
  signUpRouter,
  currentUserRouter,
} from './auth-service/routes';
import {
  getUserRouter,
  getPostItemsRouter,
  getPurchasedListRouter,
  updateUserRouter,
  updateSeenItemsRouter,
  addFavouriteItemRouter,
  removeFavouriteItemRouter,
  getFavouriteItemsRouter,
} from './user-service/routes';
import {
  createCategoryRouter,
  getAllCategoriesRouter,
  updateCategoryRouter,
  deleteCategoryRouter,
} from './category-service/routes';
import {
  getMultiItemsRouter,
  getItemRouter,
  createItemRouter,
  updateItemRouter,
  deleteItemRouter,
} from './item-service/routes';
import { purchaseRoute } from './purchase-service/routes/purchase-item';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';

dotenv.config();

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // cookie will only be available via a https call
  })
);

app.use(express.urlencoded({ extended: true }));

/* Home Route */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is ready',
  });
});

/* Routes */
// Auth Services
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signoutRouter);
app.use(signinRouter);

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

// Purchase Services
app.use(purchaseRoute);

/* Unhandled Routes */
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
