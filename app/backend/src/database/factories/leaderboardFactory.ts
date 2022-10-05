import Team from '../models/Team';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

function leaderboardFactory() {
  const leaderboardService = new LeaderboardService(Team);
  const leaderboardController = new LeaderboardController(leaderboardService);
  return leaderboardController;
}

const leaderboardController = leaderboardFactory();

export default leaderboardController;
