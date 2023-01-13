import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrdersCountByDate
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.route('/count')
  .post(protect, admin, getOrdersCountByDate);

router
  .route('/myorders')
  .get(protect, getMyOrders);

router
  .route('/:id')
  .get(protect, getOrderById);

router
  .route('/:id/pay')
  .put(protect, updateOrderToPaid);
  
router
  .route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

export default router;
