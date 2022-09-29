import { Request, Response } from 'express';
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
    const match = await MatchService.postMatch({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals,
    });

    if (!match) return res.status(404).json({ message: 'There is no team with such id!' });

    if (match === 'Same team') {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return res.status(201).json(match);
  };

  static patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await MatchService.patchMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  static updateMatchGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchService.updateMatchGoals(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Goals updated!' });
  };
}

export default MatchController;
