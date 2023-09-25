import express from 'express';

import zodValidator from '../../../../utils/middlewares/zodValidator';

import { EnumUserRole } from '../../../../utils/shared/enum';
import { emailAuthControllers } from './emailAuth.controllers';
import { emailAuthValidations } from './emailAuth.validations';

const router = express.Router();
const { ADMIN, CUSTOMER } = EnumUserRole;

router.post(
  '/signup',
  zodValidator(emailAuthValidations.createUserZodSchema),
  emailAuthControllers.createUser
);
router.post(
  '/signin',
  zodValidator(emailAuthValidations.loginUserZodSchema),
  emailAuthControllers.loginUser
);

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
export const emailAuthRoutes = router;
