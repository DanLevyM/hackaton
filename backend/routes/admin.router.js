import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/admin.controller.js';
import {protect, authorize} from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router
    .route('/users/')
    .get(getUsers)
    .post(protect, authorize('admin'), createUser);

router
    .route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(protect, deleteUser);

export default router;
