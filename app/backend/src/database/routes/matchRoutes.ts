import { Router } from 'express';
import MatchController from '../controllers/matchController';

const router = Router();

router.get('/matches', MatchController.getMatches);

export default router;
