import Team from '../models/Team';

class TeamService {
  static getTeams = async () => {
    const teams = await Team.findAll();
    return teams;
  };

  static getTeamsById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });
    return team;
  };
}

export default TeamService;
