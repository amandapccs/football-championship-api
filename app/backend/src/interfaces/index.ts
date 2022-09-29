import { FindOptions, Model } from 'sequelize';
// import { Model } from 'sequelize/types';

interface ILoginPayload {
  email: string;
  password: string;
}

interface ITokenPayload {
  email: string;
  username: string;
}

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

interface IModel<T extends Model> {
  findOne(options: FindOptions<T>): Promise<T | null>;
}

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export { ILoginPayload, IUser, ITokenPayload, IModel, IMatch };
