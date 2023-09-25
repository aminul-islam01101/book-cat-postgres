import { z } from 'zod';

//% category creation validation
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
