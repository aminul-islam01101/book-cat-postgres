import express from 'express';
import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { EnumUserRole } from '../../../utils/shared/enum';
import { orderControllers } from './order.controllers';

const router = express.Router();
const { ADMIN, CUSTOMER } = EnumUserRole; // Assuming only ADMIN can create/update/delete categories

// Middleware for ADMIN role verification

// Create a order
router.post(
  '/create-order',
  roleVerifier(CUSTOMER),
  //   zodValidator(orderValidations.createOrderZodSchema),
  orderControllers.createOrder
);

// Get all categories
// router.get('/', orderControllers.getOrders);

// Get a specific order by ID

export const orderRoutes = router;
