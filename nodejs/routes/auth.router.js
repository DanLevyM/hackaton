import updatePassword from '../controllers/auth.controller.js';
import express from 'express';

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.put('/pwd', updatePassword);

export default userRouter;
