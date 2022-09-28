import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

export class CustomError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorMiddleware = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500);
  res.json({ message: err.message });
};
export default errorMiddleware;
