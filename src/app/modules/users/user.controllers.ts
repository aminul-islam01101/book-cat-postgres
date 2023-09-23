import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';

import { UserServices } from './user.services';
import { TUserRequest, TUserResponse } from './user.types';

//& Create User
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
//& GetUsers
const getUsers: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsers();

  sendResponse<TUserResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});
//&  getUser
const getUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getUser(id);

  sendResponse<TUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});
//& Update User
const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Partial<TUserRequest>;
  const result = await UserServices.updateUser(id, updateData);

  sendResponse<TUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});
//& Delete User
const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse<TUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});
//& getProfile
const getProfile: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };
  const result = await UserServices.getProfile(email);

  sendResponse<TUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
};
