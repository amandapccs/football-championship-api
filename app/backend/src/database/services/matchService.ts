import { IMatch } from '../../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

class MatchService {
  static getMatches = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  static getMatchProgress = async (inProgressStatus: boolean) => {
    const match = await Match.findAll({
      where: { inProgress: inProgressStatus },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return match;
  };

  static postMatch = async (matchDetails: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = matchDetails;
    const match = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  };

  static patchMatch = async (id: number) => {
    const match = await Match.update({ inProgress: false }, { where: { id } });
    console.log(match);
    return match;
  };
}

export default MatchService;
