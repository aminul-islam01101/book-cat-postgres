// Import PrismaClient or any database client you are using
import { PrismaClient } from '@prisma/client';
import { TUserRequest, TUserResponse } from './user.types';

const prisma = new PrismaClient();

/* eslint-disable no-param-reassign */

const createUser = async (user: TUserRequest): Promise<TUserResponse | null> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
};

export const UserServices = {
  createUser,
};
