import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createReview,
  getTopProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// fetch all product
router.get('/', getProducts);
router.get('/top', getTopProducts);

// fetch single product
router.get('/:id', getProductById);

router.delete('/:id', [protect, admin], deleteProduct);
router.post('/', [protect, admin], createProduct);
router.put('/:id', [protect, admin], updateProduct);
router.post('/:id/reviews', protect, createReview);

export default router;
