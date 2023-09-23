import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';

import { UserServices } from './user.services';
import { TUserRequest, TUserResponse } from './user.types';

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = req.body as TUserRequest;

  const result = await UserServices.createUser(user);

  sendResponse<TUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
