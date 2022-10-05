import { Request, Response } from 'express';
import { ILeaderboardService } from '../../interfaces';

class LeaderboardController {
  constructor(private service: ILeaderboardService) {}
  async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.service.getAll();
    return res.status(200).json(leaderboard);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const leaderboard = await this.service.getAllAway();
    return res.status(200).json(leaderboard);
  }

  async getLeaderboardHome(_req: Request, res: Response) {
    const leaderboard = await this.service.getAllHome();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
