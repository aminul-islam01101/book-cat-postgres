/* eslint-disable prefer-destructuring */
import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TOrderResponse, TOrderedBooks } from './order.types';

const prisma = new PrismaClient();
//# create order
const createOrder = async (
  userId: string,
  orderedBooks: TOrderedBooks[]
): Promise<TOrderResponse | null> => {
  let orderId: string;

  const transactionResult = await prisma.$transaction([
    // Step 1: Create the order and obtain its id
    prisma.order.create({
      data: {
        userId,
      },
      select: { id: true },
    }),
  ]);

  // Extract the orderId from the transaction result
  if (transactionResult[0] && transactionResult[0].id) {
    orderId = transactionResult[0].id;
    // createdOrder = transactionResult[0];
  } else {
    // Handle error if the orderId is not available
    throw new HandleApiError(httpStatus.NOT_IMPLEMENTED, 'Order creation failed !');
  }

  // Step 2: Create the ordered books associated with the order
  const orderedBooksData = orderedBooks.map((book) =>
    prisma.orderedBook.create({
      data: {
        quantity: book.quantity,
        bookId: book.bookId,
        orderId, // Use the obtained orderId here
      },
    })
  );

  // Wait for all ordered books to be created
  await Promise.all(orderedBooksData);
  const createdOrder = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderedBooks: true,
    },
  });
  // const response = { ...createdOrder, orderedBooks };
  // Now you can return the order and any other relevant data
  return createdOrder;
};
//# get orders
const getOrders = async (userId: string, role: string): Promise<TOrderResponse[] | null> => {
  if (role === 'admin') {
    const orders = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
    return orders;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return orders;
};

export const orderServices = { createOrder, getOrders };
