import Team from '../models/Team';

// class TeamService {
//   static getTeams = async () => {
//     const teams = await Team.findAll();
//     return teams;
//   };

//   static getTeamsById = async (id: number) => {
//     const team = await Team.findOne({ where: { id } });
//     return team;
//   };
// }

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
