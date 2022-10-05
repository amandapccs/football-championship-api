import Match from '../models/Match';
import MatchService from '../services/matchService';
import MatchController from '../controllers/matchController';

function matchFactory() {
  const matchService = new MatchService(Match);
  const matchController = new MatchController(matchService);
  return matchController;
}

const matchController = matchFactory();

export default matchController;
