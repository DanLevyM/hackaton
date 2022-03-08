import {
  login,
  updatePassword,
} from '../controllers/user.controller.js';
import express from 'express';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.put('/pwd', updatePassword);

export default userRouter;
