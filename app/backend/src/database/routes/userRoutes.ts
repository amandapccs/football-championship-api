import { Router } from 'express';
import userController from '../factories/userFactory';

const router = Router();

router.post('/login', userController.login.bind(userController));
router.get('/login/validate', userController.validateToken.bind(userController));

export default router;
