import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
// /:id 때문에 라우터 경로 겹치니 주의
router.get('/:id', getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
