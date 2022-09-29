import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  static getTeams = async (_req: Request, res: Response) => {
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  };

  static getTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await TeamService.getTeamsById(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamController;
