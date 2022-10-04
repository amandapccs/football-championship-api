import UserController from '../controllers/userController';
import User from '../models/User';
import UserService from '../services/userService';

function userFactory() {
  const userService = new UserService(User);
  const userController = new UserController(userService);
  return userController;
}

const userController = userFactory();

export default userController;
