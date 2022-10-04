import Team from '../models/Team';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamController';

function teamFactory() {
  const teamService = new TeamService(Team);
  const teamController = new TeamController(teamService);
  return teamController;
}

const teamController = teamFactory();

export default teamController;
