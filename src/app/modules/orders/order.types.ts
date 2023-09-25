export type TOrderedBooks = {
  bookId: string;
  quantity: number;
};

export type TOrderResponse = {
  id?: string;
  userId?: string;
  orderedBooks?: TOrderedBooks[];
  status?: string;
  createdAt?: Date;
};
