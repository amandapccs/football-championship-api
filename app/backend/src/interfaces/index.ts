interface ILoginPayload {
  email: string;
  password: string;
}

interface ITokenPayload {
  email: string;
  username: string;
}

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export { ILoginPayload, IUser, ITokenPayload };
