import { Router } from 'express';
import matchController from '../factories/matchFactory';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const router = Router();

router.get('/matches', matchController.getMatches.bind(matchController));
router.post('/matches', verifyTokenMiddleware, matchController.postMatch.bind(matchController));
router.patch('/matches/:id/', matchController.updateMatchGoals.bind(matchController));
router.patch('/matches/:id/finish', matchController.patchMatch.bind(matchController));

export default router;
