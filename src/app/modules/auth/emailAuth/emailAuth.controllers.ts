import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { User } from '@prisma/client';
import catchAsync from '../../../../utils/shared/helpers/catchAsync';
import sendResponse, { sendDirectResponse } from '../../../../utils/shared/helpers/sendResponse';

import { cookieOptions } from '../../../../utils/shared/helpers/cookieOptions';
import { emailAuthServices } from './emailAuth.services';
import { TEmailLogin, TUserRequest } from './emailAuth.types';

//& Create User
const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = req.body as TUserRequest;

  const result = await emailAuthServices.createUser(user);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

//& login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body as TEmailLogin;
  const result = await emailAuthServices.loginUser(loginData);
  const { refreshToken, ...rest } = result;

  // set refresh token into cookie

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.cookie('accessToken', rest.accessToken, cookieOptions);

  sendDirectResponse<string>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    token: rest.accessToken,
  });
});

export const emailAuthControllers = {
  createUser,
  loginUser,
};
