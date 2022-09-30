import Team from '../models/Team';
import Match from '../models/Match';
import { generateLeaderboard, sortLeaderboard } from '../helpers/leaderboardHelpers';

export default class LeaderboardService {
  static async getAll() {
    const team = await Team.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ],
    });
    const makeLeaderboard = team.map(generateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(makeLeaderboard);
    return sortedLeaderboard;
  }
}
