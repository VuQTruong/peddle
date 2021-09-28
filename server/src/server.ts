import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { signinRouter, signoutRouter, signUpRouter, currentUserRouter } from './auth-service/routes';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Home Route */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is ready',
  });
});

/* Routes */
app.use(signinRouter);
app.use(signoutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);


/* Unhandled Routes */
app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
