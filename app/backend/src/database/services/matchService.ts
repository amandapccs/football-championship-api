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
}

export default MatchService;
