// Import PrismaClient or any database client you are using
import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { configs } from '../../../../utils/configs/env.configs';
import { HandleApiError } from '../../../../utils/shared/errors/handleApiError';
import { jwtHelpers } from '../../../../utils/shared/helpers/jwtHelpers';
import { TEmailLogin, TLoginUserResponse, TUserRequest, TUserResponse } from './emailAuth.types';

const prisma = new PrismaClient();

/* eslint-disable no-param-reassign */

//# Create User
const createUser = async (user: TUserRequest): Promise<TUserResponse | null> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
};

//#  login user

const loginUser = async (payload: TEmailLogin): Promise<TLoginUserResponse> => {
  const { email, password } = payload;
  console.log('🌼 🔥🔥 file: emailAuth.services.ts:28 🔥🔥 loginUser 🔥🔥 password🌼', password);

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Verify the password
  const isPasswordValid = password === isUserExist.password;

  if (!isPasswordValid) {
    throw new HandleApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // create access token & refresh token
  const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000;

  const { id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, role, email, iat: oneYearAgo },
    configs.jwtSecretAccess as Secret,
    configs.jwtSecretAccessExpired as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role, email },
    configs.jwtSecretRefresh as Secret,
    configs.jwtSecretRefreshExpired as string
  );

  return {
    accessToken,
    refreshToken,
    email,
    role,
    userId: id,
    iat: oneYearAgo,
  };
};

export const emailAuthServices = {
  createUser,
  loginUser,
};
