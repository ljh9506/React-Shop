import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// fetch all product
router.put('/:id', [protect, admin], updateUser);
router.get('/', [protect, admin], getUsers);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/', registerUser);
router.delete('/:id', [protect, admin], deleteUser);
router.get('/:id', [protect, admin], getUserById);

export default router;
