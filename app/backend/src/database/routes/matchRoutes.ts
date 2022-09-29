import { Router } from 'express';
import MatchController from '../controllers/matchController';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const router = Router();

router.get('/matches', MatchController.getMatches);
router.post('/matches', verifyTokenMiddleware, MatchController.postMatch);
router.patch('/matches/:id/', MatchController.updateMatchGoals);
router.patch('/matches/:id/finish', MatchController.patchMatch);

export default router;
