import {
  login,
  updatePassword,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  askRegister,
} from '../controllers/user.controller.js';
import express from 'express';
import {protect} from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.get('/me', protect, getMe);
userRouter.put('/updatedetails', protect, updateDetails);
userRouter.put('/updatepassword', protect, updatePassword);
userRouter.post('/forgotpassword', forgotPassword);
userRouter.put('/resetpassword/:resettoken', resetPassword);
userRouter.post('/askRegister', askRegister);

export default userRouter;
