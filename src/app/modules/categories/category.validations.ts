import { z } from 'zod';

//% Login user validation
const categoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const categoryValidations = {
  categoryZodSchema,
};
