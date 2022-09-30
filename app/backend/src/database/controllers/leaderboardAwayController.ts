import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/leaderboardAwayService';

class LeaderboardController {
  static getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await LeaderboardAwayService.getAll();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
