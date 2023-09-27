import { UserRole } from '@prisma/client';
import { z } from 'zod';

//% Create User validation
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.nativeEnum(UserRole),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    profileImg: z.string().optional(),
  }),
});
//% Update User validation
const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),

      contactNo: z.string().optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
    })
    .optional(),
});
const getProfileZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});
const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const UserValidations = {
  createUserZodSchema,
  updateUserZodSchema,
  getProfileZodSchema,
  loginUserZodSchema,
};
