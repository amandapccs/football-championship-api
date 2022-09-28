import User from '../models/User';

class UserService {
  static getLogin = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;

    return user;
  };
}

export default UserService;
