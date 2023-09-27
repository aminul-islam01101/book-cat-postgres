import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { categoryServices } from './category.services';
import { TCategoryResponse } from './category.types';

//& Create category
const createCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body as { title: string };

  const result = await categoryServices.createCategory(title);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfully!',
    data: result,
  });
});
//& GetCategories
const getCategories: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getCategories();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: result,
  });
});
//&  getCategory
const getCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryServices.getCategory(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully!',
    data: result,
  });
});
//& Update Category
const updateCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body as { title: string };
  const result = await categoryServices.updateCategory(id, title);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully!',
    data: result,
  });
});
//& Delete Category
const deleteCategory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryServices.deleteCategory(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully!',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
};
