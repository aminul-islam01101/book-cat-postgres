import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import pick from '../../../utils/shared/helpers/pick';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { paginationFields } from '../../../utils/shared/paginations/pagination.constants';
import { bookFilterableFields } from './book.constants';
import { bookServices } from './book.services';
import { TBookCreate } from './book.types';

//& Create category
const createBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const book = req.body as Book;

  const result = await bookServices.createBook(book);

  sendResponse<TBookCreate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book created successfully!',
    data: result,
  });
});
//& GetBooks
const getBooks: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await bookServices.getBooks(filters, paginationOptions);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result?.data.length ? 'No Book found' : 'Book retrieved successfully !'}`,
    meta: result?.meta,
    data: result?.data,
  });
});
//&  getBook
const getBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookServices.getBook(id);

  sendResponse<TBookCreate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});
//& Update Book
const updateBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Partial<TBookCreate>;
  const result = await bookServices.updateBook(id, updateData);

  sendResponse<TBookCreate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});
//& Delete Book
const deleteBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookServices.deleteBook(id);

  sendResponse<TBookCreate>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

export const bookControllers = {
  createBook,
  deleteBook,
  updateBook,
  getBooks,
  getBook,
};
