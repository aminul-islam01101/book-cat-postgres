import { OrderedBook } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { orderServices } from './order.services';
import { TOrderResponse } from './order.types';

//& Create order
const createOrder: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };
  const { orderedBooks } = req.body as { orderedBooks: OrderedBook[] };

  const result = await orderServices.createOrder(id, orderedBooks);

  sendResponse<TOrderResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order created successfully!',
    data: result,
  });
});
//& get orders
const getOrders: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id, role } = req.user as { id: string; role: string };

  const result = await orderServices.getOrders(id, role);

  sendResponse<TOrderResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order retrieved successfully!',
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  getOrders,
};
