// Import PrismaClient or any database client you are using
import { PrismaClient } from '@prisma/client';

import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TCategoryResponse } from './category.types';

const prisma = new PrismaClient();

/* eslint-disable no-param-reassign */

//# Create category
const createCategory = async (category: string): Promise<TCategoryResponse | null> => {
  const lowerCaseCategory = category.toLowerCase();

  const existingCategory = await prisma.category.findFirst({
    where: {
      title: {
        equals: lowerCaseCategory,
        mode: 'insensitive',
      },
    },
  });

  if (existingCategory) {
    throw new HandleApiError(httpStatus.CONFLICT, 'category already exists !');
  }

  const createdCategory = await prisma.category.create({
    data: { title: category },
  });

  return createdCategory;
};

//# get categories

const getCategories = async (): Promise<TCategoryResponse[] | null> => {
  const categories = await prisma.category.findMany();
  return categories;
};
//#  get category
const getCategory = async (id: string): Promise<TCategoryResponse | null> => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
};

//# Update category
const updateCategory = async (id: string, payload: string): Promise<TCategoryResponse | null> => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!isCategoryExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: { title: payload },
  });

  return updatedCategory;
};
//# Delete category

const deleteCategory = async (id: string): Promise<TCategoryResponse | null> => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!isCategoryExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }
  // Delete the category
  const deletedCategory = await prisma.category.delete({
    where: {
      id,
    },
  });
  return deletedCategory;
};

export const categoryServices = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
