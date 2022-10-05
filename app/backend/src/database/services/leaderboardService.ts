import Team from '../models/Team';
import Match from '../models/Match';
import { generateLeaderboard, sortLeaderboard } from '../helpers/leaderboardHelpers';
import { generateLeaderboardAway, sortLeaderboardAway } from '../helpers/leaderboardAwayHelpers';

export default class LeaderboardService {
  constructor(private model: typeof Team) {}
  async getAll() {
    const team = await this.model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
        { model: Match, as: 'matchesAway', where: { inProgress: 0 } },
      ],
    });
    const makeLeaderboard = team.map(generateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(makeLeaderboard);
    return sortedLeaderboard;
  }

  async getAllAway() {
    const team = await this.model.findAll({
      include: [
        { model: Match, as: 'matchesAway', where: { inProgress: 0 } },
      ],
    });
    const makeLeaderboard = team.map(generateLeaderboardAway);
    const sortedLeaderboard = sortLeaderboardAway(makeLeaderboard);
    return sortedLeaderboard;
  }

  async getAllHome() {
    const team = await this.model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ],
    });
    const makeLeaderboard = team.map(generateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(makeLeaderboard);
    return sortedLeaderboard;
  }
}
