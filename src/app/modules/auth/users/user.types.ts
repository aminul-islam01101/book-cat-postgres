import { TLoginUserResponse } from '../emailAuth/emailAuth.types';

type TReviewAndRating = {
  id: string;
  review: string;
  rating: number; // Assuming it's an integer representing the rating
  userId: string;
  bookId: string;
  user: TLoginUserResponse; // Reference the User type
  book: TBook; // Reference the Book type
};

type TBook = {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  publicationDate: string;
  categoryId: string;
  reviewsAndRatings?: TReviewAndRating[];
};

export { TBook, TReviewAndRating };
