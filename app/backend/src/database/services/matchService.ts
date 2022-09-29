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
    if (homeTeam === awayTeam) return 'Same team';
    try {
      const match = await Match.create({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
      });
      return match;
    } catch (e) {
      return false;
    }
  };

  static findTeam = async (teamId1: number, teamId2: number) => {
    const team1 = await Team.findOne({ where: { teamId1 } });
    const team2 = await Team.findOne({ where: { teamId2 } });

    if (!team1 || !team2) return false;
    return true;
  };

  static patchMatch = async (id: number) => {
    const match = await Match.update({ inProgress: false }, { where: { id } });
    console.log(match);
    return match;
  };
}

export default MatchService;
