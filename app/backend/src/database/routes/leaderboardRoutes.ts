import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import LeaderboardAwayController from '../controllers/leaderboardAwayController';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getLeaderboard);
router.get('/leaderboard/away', LeaderboardAwayController.getLeaderboard);

export default router;
