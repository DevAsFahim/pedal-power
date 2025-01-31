export interface IUser {
  name: string;
  email: 'admin' | 'user';
  password: string;
  role: string;
  isBlocked: boolean;
}
