import { Request, Response } from 'express';
import { verifyToken } from '../middlewares/jwt';
import MatchService from '../services/matchService';

class MatchController {
  static getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await MatchService.getMatches();
      return res.status(200).json(matches);
    }
    if (inProgress) {
      const bool = inProgress === 'true';
      const match = await MatchService.getMatchProgress(bool);
      return res.status(200).json(match);
    }
  };

  static postMatch = async (req: Request, res: Response) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json({ message: 'Token must be a valid token' }); }
    try {
      verifyToken(token);
      const match = await MatchService.postMatch({
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
      });
      return res.status(201).json(match);
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

  static patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await MatchService.patchMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
