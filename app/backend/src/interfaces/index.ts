import Team from '../database/models/Team';
import User from '../database/models/User';

interface IUserService {
  getLogin(email: string): Promise<User | boolean>;
}

interface ITeamService {
  getTeams(): Promise<Team[]>;
  getTeamsById(id: number): Promise<Team | null>;
}

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export { IMatch, IUserService, ITeamService };
