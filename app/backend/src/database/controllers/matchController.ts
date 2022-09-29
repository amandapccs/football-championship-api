import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  // static getMatches = async (_req: Request, res: Response) => {
  //   const matches = await MatchService.getMatches();
  //   return res.status(200).json(matches);
  // };

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
}

export default MatchController;
