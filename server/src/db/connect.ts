import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const connectToDB = () => {
  const databaseURI = process.env.MONGODB_URL as string;
  const options: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose
    .connect(databaseURI, options)
    .then(() => {
      console.log('Database Connected!');
    })
    .catch((err) => {
      throw new DatabaseConnectionError();
    });
};

export default connectToDB;
