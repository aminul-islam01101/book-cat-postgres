enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

type TUserRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg?: string | null;
};
type TUserResponse = TUserRequest & {
  id: string;
  reviewsAndRatings?: TReviewAndRating[];
};

type TReviewAndRating = {
  id: string;
  review: string;
  rating: number; // Assuming it's an integer representing the rating
  userId: string;
  bookId: string;
  user: TUserResponse; // Reference the User type
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

export { TBook, TReviewAndRating, TUserRequest, TUserResponse, UserRole };
