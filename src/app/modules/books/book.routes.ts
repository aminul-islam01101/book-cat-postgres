import express from 'express';
import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { EnumUserRole } from '../../../utils/shared/enum';
import { bookControllers } from './book.controllers';
import { bookValidations } from './book.validations';

const router = express.Router();
const { ADMIN } = EnumUserRole; // Assuming only ADMIN can create/update/delete categories

// Middleware for ADMIN role verification

// Create a book
router.post(
  '/create-book',
  roleVerifier(ADMIN),
  zodValidator(bookValidations.createBookZodSchema),
  bookControllers.createBook
);

// Get all categories
// router.get('/', bookControllers.getBooks);

// Get a specific book by ID
router.get('/:id', bookControllers.getBook);

// Update a specific book by ID
router.patch(
  '/:id',
  roleVerifier(ADMIN),
  zodValidator(bookValidations.updateBookZodSchema),
  bookControllers.updateBook
);

// Delete a specific book by ID
router.delete('/:id', roleVerifier(ADMIN), bookControllers.deleteBook);

export const bookRoutes = router;
