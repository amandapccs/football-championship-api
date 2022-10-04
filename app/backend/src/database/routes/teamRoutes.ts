import { Router } from 'express';
import teamController from '../factories/teamFactory';

const router = Router();

router.get('/teams', teamController.getTeams.bind(teamController));
router.get('/teams/:id', teamController.getTeamsById.bind(teamController));

export default router;
