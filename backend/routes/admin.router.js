import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/admin.controller.js';
import {protect} from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router
    .route('/users/')
    .get(getUsers)
    .post(createUser);

router
    .route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(protect, deleteUser);

export default router;
