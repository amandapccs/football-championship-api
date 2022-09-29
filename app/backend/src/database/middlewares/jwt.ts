import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'g0t4s3cr3tc4ny0uk33p1t';
const jwtOptions: SignOptions = { expiresIn: '4d', algorithm: 'HS256' };

const generateToken = async (email: string): Promise<string> => {
  const token = sign({ email }, SECRET, jwtOptions);

  return token;
};

const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, SECRET) as JwtPayload;
    return decoded;
  } catch (err) {
    return err;
  }
};

export { generateToken, verifyToken };
