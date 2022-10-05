import Team from '../models/Team';
import Match from '../models/Match';
import { generateLeaderboard, sortLeaderboard } from '../helpers/leaderboardHelpers';
import { generateLeaderboardAway, sortLeaderboardAway } from '../helpers/leaderboardAwayHelpers';
import { sortTeamName, generateMainLeaderboard } from '../helpers/leaderboardMainHelpers';

export default class LeaderboardService {
  constructor(private model: typeof Team) {}
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

  async getAll() {
    const home = await this.getAllHome();
    const away = await this.getAllAway();
    home.sort(sortTeamName);
    away.sort(sortTeamName);
    const makeLeaderboard = generateMainLeaderboard(home, away);
    console.log(makeLeaderboard);
    const sortedAll = sortLeaderboard(makeLeaderboard);
    return sortedAll;
  }
}
