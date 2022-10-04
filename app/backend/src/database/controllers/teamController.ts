import { Request, Response } from 'express';
import { ITeamService } from '../../interfaces';

class TeamController {
  constructor(private service: ITeamService) {}
  async getTeams(_req: Request, res: Response) {
    const teams = await this.service.getTeams();
    return res.status(200).json(teams);
  }

  async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.getTeamsById(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamController;
