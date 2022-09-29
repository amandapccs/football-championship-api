import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const mySecret = process.env.JWT_SECRET || 'g0t4s3cr3tc4ny0uk33p1t';

    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const decode = verify(token, mySecret) as JwtPayload;

    req.body.user = decode;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyTokenMiddleware;
