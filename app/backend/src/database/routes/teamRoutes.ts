import { Router } from 'express';
import TeamController from '../controllers/teamController';

const router = Router();

router.get('/teams', TeamController.getTeams);
router.get('/teams/:id', TeamController.getTeamsById);

export default router;
