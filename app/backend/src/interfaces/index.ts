import Team from '../database/models/Team';
import User from '../database/models/User';

interface IUserService {
  getLogin(email: string): Promise<User | boolean>;
}

interface ITeamService {
  getTeams(): Promise<Team[]>;
  getTeamsById(id: number): Promise<Team | null>;
}

interface IMatchService {
  getMatches(): Promise<IMatch[]>;
  getMatchProgress(inProgressStatus: boolean): Promise<IMatch[]>;
  postMatch(matchDetails: IMatch): Promise<IMatch | boolean | string>;
  patchMatch(id: number): Promise<[number, IMatch[]]>;
  updateMatchGoals(id: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<[number, IMatch[]]>;
}

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export { IMatch, IUserService, ITeamService, IMatchService };
