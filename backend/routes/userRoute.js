import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import { adminLogin, addAdmin } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const userRouter=express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/admin',adminAuth, adminLogin); 
userRouter.post('/addAdmin', addAdmin   );
userRouter.get('/profile', getProfile);

export default userRouter;