// export the app
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import path from 'path';
import routes from './app/routes';

import corsOptions from './utils/configs/cors.configs';
import globalErrorHandler from './utils/middlewares/globalErrorHandler';
import { requestLogger } from './utils/middlewares/requestLogger';
import { ln, logger } from './utils/shared/logger';
//* passport configs
// import './utils/configs/passport.configs';

const app: Application = express();
app.use(cookieParser());

logger.warn('test Log', { f: path.basename(__filename), l: ln() });

// middlewares

app.use([
  cors(corsOptions),
  cookieParser(),
  express.static(path.join(__dirname, '../public')),
  express.json(),
  express.urlencoded({ extended: true }),
  requestLogger,
  //* for storing login session
  // session(sessionConfigs),
]);

//* for passport authentication
//* for passport authentication
/* app.set('trust proxy', 1);
app.use(passport.initialize());
app.use(passport.session()); */

//# route base
// home route
app.get('^/$|/index(.html)?', (_req, res) => {
  res.sendFile(path.join(__dirname, './utils/shared/views', 'index.html'));
});
// business routes
app.use('/api/v1', routes);

//# error handler
// global error handler
app.use(globalErrorHandler);
// wrong path error route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: '404! Url doest not exist',
    errorMessages: [
      {
        path: req.originalUrl,
        message: '404! Url doest not exist',
      },
    ],
  });
  next();
});

export default app;
