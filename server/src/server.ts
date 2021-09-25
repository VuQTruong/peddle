import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import AppError from './utilities/AppError';
import connectToDB from './db/connect';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import itemRouter from './routes/itemRoutes';
import purchaseRouter from './routes/purchaseRoutes';
import chatRouter from './routes/chatRoutes';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* Home Route */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is ready',
  });
});

/* Routes */
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/chat', chatRouter);

/* Unhandled Routes */
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Cannot find ${req.originalUrl}!`, 404);
  next(error);
});

/* Error Handling Net */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
});

const host = (process.env.HOST || 'localhost') as string;
const port = (process.env.PORT || 5000) as number;
app.listen(port, host, () => {
  console.log(`Serve at http://${host}:${port}`);

  // Connect to database
  connectToDB();
});
