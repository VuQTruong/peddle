import express from 'express';
import "express-async-errors";

import dotenv from 'dotenv';

import { signinRouter, signoutRouter, signUpRouter, currentUserRouter } from './auth-service/routes';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from "cookie-session";

dotenv.config();

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false // cookie will only be available via a https call 
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
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signoutRouter);
app.use(signinRouter);


/* Unhandled Routes */
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
