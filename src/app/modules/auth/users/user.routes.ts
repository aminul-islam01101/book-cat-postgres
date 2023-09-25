import express from 'express';

import zodValidator from '../../../../utils/middlewares/zodValidator';

import roleVerifier from '../../../../utils/middlewares/roleVerifier';
import { EnumUserRole } from '../../../../utils/shared/enum';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();
const { ADMIN, CUSTOMER } = EnumUserRole;

router.get('/', roleVerifier(ADMIN), UserControllers.getUsers);
router.get(
  '/profile',
  zodValidator(UserValidations.getProfileZodSchema),
  UserControllers.getProfile
);
router
  .route('/:id')
  .get(UserControllers.getUser)
  .patch(zodValidator(UserValidations.updateUserZodSchema), UserControllers.updateUser)
  .delete(UserControllers.deleteUser);
// .patch(productController.updateProductById)

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
