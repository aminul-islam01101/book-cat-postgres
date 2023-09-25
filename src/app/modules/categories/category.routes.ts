import express from 'express';
import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { EnumUserRole } from '../../../utils/shared/enum';
import { categoryControllers } from './category.controllers';
import { categoryValidations } from './category.validations';

const router = express.Router();
const { ADMIN } = EnumUserRole; // Assuming only ADMIN can create/update/delete categories

// Middleware for ADMIN role verification

// Create a category
router.post(
  '/create-category',
  roleVerifier(ADMIN),
  zodValidator(categoryValidations.categoryZodSchema),
  categoryControllers.createCategory
);

// Get all categories
router.get('/', categoryControllers.getCategories);

// Get a specific category by ID
router.get('/:id', categoryControllers.getCategory);

// Update a specific category by ID
router.patch(
  '/:id',
  roleVerifier(ADMIN),
  zodValidator(categoryValidations.categoryZodSchema),
  categoryControllers.updateCategory
);

// Delete a specific category by ID
router.delete('/:id', roleVerifier(ADMIN), categoryControllers.deleteCategory);

export const categoryRoutes = router;
