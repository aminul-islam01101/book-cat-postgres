// Import PrismaClient or any database client you are using
import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TUserRequest, TUserResponse } from './user.types';

const prisma = new PrismaClient();

/* eslint-disable no-param-reassign */

//# Create User
const createUser = async (user: TUserRequest): Promise<TUserResponse | null> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
};

//#  GetUsers
const getUsers = async (): Promise<TUserResponse[] | null> => {
  const users = await prisma.user.findMany();
  return users;
};
//#  getUser
const getUser = async (id: string): Promise<TUserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
//# Update User
const updateUser = async (
  id: string,
  payload: Partial<TUserRequest>
): Promise<TUserResponse | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedUser;
};
//# Delete User
const deleteUser = async (id: string): Promise<TUserResponse | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  // Delete the user
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deletedUser;
};

//# get Profile

const getProfile = async (email: string): Promise<TUserResponse | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log('🌼 🔥🔥 file: user.services.ts:84 🔥🔥 getProfile 🔥🔥 isUserExist🌼', isUserExist);

  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return isUserExist;
};
export const UserServices = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
};
