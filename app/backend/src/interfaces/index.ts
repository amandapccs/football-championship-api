import User from '../database/models/User';

interface IUserService {
  getLogin(email: string): Promise<User | boolean>;
}
interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export { IMatch, IUserService };
