import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await LeaderboardService.getAll();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
