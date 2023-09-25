import { z } from 'zod';
import { EnumUserRole } from '../../../../utils/shared/enum';

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
    role: z.nativeEnum(EnumUserRole),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    profileImg: z.string().optional(),
  }),
});
//% Login user validation
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

export const emailAuthValidations = {
  createUserZodSchema,
  loginUserZodSchema,
};
