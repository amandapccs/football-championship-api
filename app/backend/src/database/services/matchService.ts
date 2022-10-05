import { IMatch } from '../../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

class MatchService {
  constructor(private matchModel: typeof Match) {}
  async getMatches() {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getMatchProgress(inProgressStatus: boolean) {
    const match = await this.matchModel.findAll({
      where: { inProgress: inProgressStatus },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return match;
  }

  async postMatch(matchDetails: IMatch) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = matchDetails;
    if (homeTeam === awayTeam) return 'Same team';
    try {
      const match = await this.matchModel.create({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
      });
      return match;
    } catch (e) {
      return false;
    }
  }

  async patchMatch(id: number) {
    const match = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return match;
  }

  async updateMatchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.matchModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }
}

export default MatchService;
