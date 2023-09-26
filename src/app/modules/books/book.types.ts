export type TBookCreate = {
  title: string;
  author: string;
  price: number;
  genre: string;
  publicationDate: string;
  categoryId: string;
};
export type TBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
