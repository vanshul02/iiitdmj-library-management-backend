import * as express from 'express';
import * as dotenv from 'dotenv';
import categoryRoutes from './api/routes/category';
import { AppDataSource } from './db/DataSource';
dotenv.config({ path: __dirname + '/.env' });

const app: express.Application = express();
const port: number = process.env.PORT as any | 3000;

app.use('/api/category', categoryRoutes);

AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port);
  });
}).catch(error => {
  console.log(error);
})