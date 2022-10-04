import Team from '../models/Team';

class TeamService {
  constructor(private model: typeof Team) {}

  async getTeams() {
    const teams = await this.model.findAll();
    return teams;
  }

  async getTeamsById(id: number) {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
