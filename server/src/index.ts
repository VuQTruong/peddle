import { app } from './server';
import connectToDB from './db/connect';
import { DatabaseConnectionError } from './errors/database-connection-error';

const host = (process.env.HOST || 'localhost') as string;
const port = (process.env.PORT || 5000) as number;
app.listen(port, host, () => {
  // Connect to database
  //   connectToDB();
  console.log(`Serve at http://${host}:${port}`);

});
