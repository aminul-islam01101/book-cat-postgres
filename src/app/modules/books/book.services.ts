// Import PrismaClient or any database client you are using
import { Book, PrismaClient } from '@prisma/client';

import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TBookCreate } from './book.types';

const prisma = new PrismaClient();

/* eslint-disable no-param-reassign */

//# Create book
const createBook = async (book: Book): Promise<Book | null> => {
  const { author, title, publicationDate, categoryId } = book;
  const existingBook = await prisma.book.findFirst({
    where: {
      title,
      author,
      publicationDate,
    },
  });
  if (existingBook) {
    throw new HandleApiError(httpStatus.CONFLICT, 'book already exists !');
  }
  const existingCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });
  if (!existingCategory) {
    throw new HandleApiError(httpStatus.CONFLICT, 'category does not exist !');
  }

  const createdBook = await prisma.book.create({
    data: book,
    include: {
      category: true,
    },
  });

  return createdBook;
};

//# get books

const getBooks = async (): Promise<TBookCreate[] | null> => {
  const books = await prisma.book.findMany();
  return books;
};
//#  get book
const getBook = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return book;
};

//# Update book
const updateBook = async (id: string, payload: Partial<Book>): Promise<Book | null> => {
  const isBookExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!isBookExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }
  if (payload.categoryId) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: payload.categoryId,
      },
    });
    if (!existingCategory) {
      throw new HandleApiError(httpStatus.CONFLICT, 'category does not exist !');
    }
  }

  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedBook;
};
//# Delete book

const deleteBook = async (id: string): Promise<TBookCreate | null> => {
  const isBookExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!isBookExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }
  // Delete the book
  const deletedBook = await prisma.book.delete({
    where: {
      id,
    },
  });
  return deletedBook;
};

export const bookServices = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
