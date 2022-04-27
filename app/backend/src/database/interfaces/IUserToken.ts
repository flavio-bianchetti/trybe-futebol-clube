import IUser from './IUser';

export default interface IUserToken extends IUser{
  user: IUser,
  token: string;
}
