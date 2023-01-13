import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  setUserPasswordToken,
  getUserPasswordToken,
  getUrlValidToken,
  newUser
} from '../controllers/userController.js';

const router = express.Router()

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

router.post('/login', authUser);

router
  .route('/newuser')
  .post(protect, admin, newUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router
  .route('/userdetails')
  .get(protect, admin);

router
  .route('/forgot')
  .post(setUserPasswordToken);

router
  .route('/reset')
  .post(getUserPasswordToken);

router
  .route('/valid/:user/:token')
  .get(getUrlValidToken);

export default router;
