import { ModelStatic } from 'sequelize';
import User from '../models/User';

class UserService {
  constructor(private model: ModelStatic<User>) { }
  getLogin = async (email: string) => {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return false;

    return user;
  };
}

export default UserService;
