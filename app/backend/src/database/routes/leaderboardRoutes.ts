import { Router } from 'express';
import leaderboardController from '../factories/leaderboardFactory';

const router = Router();

router.get('/leaderboard', leaderboardController.getLeaderboard.bind(leaderboardController));
router.get('/leaderboard/home', leaderboardController.getLeaderboardHome
  .bind(leaderboardController));
router.get('/leaderboard/away', leaderboardController.getLeaderboardAway
  .bind(leaderboardController));

export default router;
