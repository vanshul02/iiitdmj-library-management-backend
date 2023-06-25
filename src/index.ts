import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import authRouter from './api/routes/Auth.Routes';
import userRouter from './api/routes/User.Routes';
import categoryRoutes from './api/routes/Category.Routes';
import bookRoutes from './api/routes/Book.Routes';
import copyRoutes from './api/routes/Copy.Routes';
import { AppDataSource } from './db/DataSource';
import AppError from './utils/AppError';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import redisClient from './utils/ConnectRedis';
import validateEnv from './utils/ValidateEnv';
dotenv.config({ path: __dirname + '/.env' });

AppDataSource.initialize().then(async () => {
  validateEnv();

  const app: express.Application = express();
  // 1. Body parser
  app.use(express.json({ limit: '10kb' }));

  // 2. Logger
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  // 3. Cookie Parser
  app.use(cookieParser());

  // 4. Cors
  app.use(
    cors({
      origin: "*"
    })
  );

  // ROUTES
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/category', categoryRoutes);
  app.use('/api/book', bookRoutes);
  app.use('/api/copy', copyRoutes);

  // HEALTH CHECKER
  app.get('/api/healthChecker', async (_, res: Response) => {
    const message = await redisClient.get('try');

    res.status(200).json({
      status: 'success',
      message,
    });
  });

  // UNHANDLED ROUTE
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      error.status = error.status || 'error';
      error.statusCode = error.statusCode || 500;

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  );

  const port = process.env.PORT as any | 3000;


  app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port);
  });
}).catch(error => {
  console.log(error);
})