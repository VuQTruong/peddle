import mongoose from 'mongoose';

const connectToDB = () => {
  // TODO: Create new database on MongoDB Atlas and Update database URL
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
      console.log('DB Connection Error', err);
      process.exit(1);
    });
};

export default connectToDB;
