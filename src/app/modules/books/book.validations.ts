import { z } from 'zod';

// Define the CreateBookRequestBody validation schema
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    price: z.number().min(0, {
      message: 'Price must be a non-negative number',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({
      required_error: 'Category ID is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  price: z.number().optional(),
  genre: z.string().optional(),
  publicationDate: z.string().optional(),
  categoryId: z.string().optional(),
});

export const bookValidations = {
  createBookZodSchema,
  updateBookZodSchema,
};
