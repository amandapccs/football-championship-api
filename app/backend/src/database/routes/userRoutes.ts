import { Router } from 'express';
import UserController from '../controllers/userController';
import User from '../models/User';
import UserService from '../services/userService';

const userService = new UserService(User);
const userController = new UserController(userService);

const router = Router();

router.post('/login', userController.login.bind(this));
router.get('/login/validate', userController.validateToken.bind(this));

export default router;
