import express from 'express';
import roleVerifier from '../../../utils/middlewares/roleVerifier';
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
router.get('/', roleVerifier(CUSTOMER, ADMIN), orderControllers.getOrders);
router.get('/:orderId', roleVerifier(CUSTOMER, ADMIN), orderControllers.getOrder);

// Get all categories
// router.get('/', orderControllers.getOrders);

// Get a specific order by ID

export const orderRoutes = router;
