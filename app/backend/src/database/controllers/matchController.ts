import { Request, Response } from 'express';
import { IMatchService } from '../../interfaces';

class MatchController {
  constructor(private service: IMatchService) {}
  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    }
    if (inProgress) {
      const bool = inProgress === 'true';
      const match = await this.service.getMatchProgress(bool);
      return res.status(200).json(match);
    }
  }

  async postMatch(req: Request, res: Response) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
    const match = await this.service.postMatch({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals,
    });

    if (!match) return res.status(404).json({ message: 'There is no team with such id!' });

    if (match === 'Same team') {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return res.status(201).json(match);
  }

  async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.patchMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.updateMatchGoals(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Goals updated!' });
  }
}

export default MatchController;
