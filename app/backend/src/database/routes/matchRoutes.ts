import { Router } from 'express';
import MatchController from '../controllers/matchController';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const router = Router();

router.get('/matches', MatchController.getMatches);
router.post('/matches', verifyTokenMiddleware, MatchController.postMatch);

export default router;
