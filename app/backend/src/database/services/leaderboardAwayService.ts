import Team from '../models/Team';
import Match from '../models/Match';
import { generateLeaderboard, sortLeaderboard } from '../helpers/leaderboardAwayHelpers';

export default class LeaderboardAwayService {
  static async getAll() {
    const team = await Team.findAll({
      include: [
        { model: Match, as: 'matchesAway', where: { inProgress: 0 } },
      ],
    });
    const makeLeaderboard = team.map(generateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(makeLeaderboard);
    return sortedLeaderboard;
  }
}
