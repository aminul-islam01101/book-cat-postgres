import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';

import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();

router.post(
  '/signup',
  zodValidator(UserValidations.createUserZodSchema),
  UserControllers.createUser
);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

// router
//   .route('/:id')
//   .patch(productController.updateProductById)
//   .delete(productController.deleteProductById);
export const UserRoutes = router;
