import {
  login,
  updatePassword,
  getMe,
  forgotPassword,
} from '../controllers/user.controller.js';
import express from 'express';
import {protect} from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.put('/pwd', updatePassword);
userRouter.get('/me', protect, getMe);
userRouter.post('/forgotpassword', forgotPassword);

export default userRouter;
