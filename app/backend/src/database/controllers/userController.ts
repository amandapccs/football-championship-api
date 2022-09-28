import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../middlewares/jwt';
import UserService from '../services/userService';
import User from '../models/User';

class UserController {
  static login = async (req: Request, res: Response) => {
    const { email: emailUser, password } = req.body;
    if (!emailUser || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await UserService.getLogin(emailUser) as User;
    const { email } = user;
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = await generateToken(email);
    console.log(token);
    return res.status(200).json({ token });
  };

  static validateToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json({ message: 'No token was informed' }); }
    try {
      const verifyUserToken = verifyToken(token) as User;
      const user = await UserService.getLogin(verifyUserToken.email) as User;
      return res.status(200).json({ role: user.role });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

export default UserController;
