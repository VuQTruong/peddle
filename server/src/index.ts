import { app } from './server';
import connectToDB from './db/connect';

const host = (process.env.HOST || 'localhost') as string;
const port = (process.env.PORT || 5000) as number;
app.listen(port, host, () => {
  console.log(`Serve at http://${host}:${port}`);

  // Connect to database
  connectToDB();
});
