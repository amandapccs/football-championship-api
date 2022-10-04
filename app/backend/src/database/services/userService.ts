import User from '../models/User';

class UserService {
  constructor(private model: typeof User) {}
  async getLogin(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return false;

    return user;
  }
}

export default UserService;
