/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';

import { configs } from '../configs/env.configs';
import { HandleApiError } from '../shared/errors/handleApiError';

import handleZodError from '../shared/errors/handleZodError';
import { errorLogger } from '../shared/logger';
import { TGenericErrorMessage } from '../shared/types/errorTypes';

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (configs.env === 'development') {
    console.log('🌼 ----------------------------------------------------------🌼');
    console.log('🌼 🔥🔥 file: globalErrorHandler.ts:18 🔥🔥 error🌼', error);
    console.log('🌼 ----------------------------------------------------------🌼');
    errorLogger.error(error);
  } else {
    errorLogger.error(error);
  }

  let statusCode = 500;
  let errorName = 'Something went wrong !';
  let errorMessages: TGenericErrorMessage[] = [];

  // mongoose validation error handler
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;

    // handleCastError error handler
  }

  // if(error instanceof JsonWebTokenError){}

  // api error handler
  else if (error instanceof HandleApiError) {
    statusCode = error?.statusCode;
    errorName = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    // node default error handler
  } else if (error instanceof Error) {
    errorName = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  // error response provider
  res.status(statusCode).json({
    success: false,
    errorName,
    errorMessages,
    stack: configs.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
