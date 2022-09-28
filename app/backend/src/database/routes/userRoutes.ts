import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/login', UserController.login);
router.get('/login/validate', UserController.validateToken);

export default router;
