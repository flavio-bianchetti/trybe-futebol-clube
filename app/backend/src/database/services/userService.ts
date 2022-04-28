import { IUser, IUserToken } from '../interfaces';
import User from '../models/User';
import { CryptPass, Token } from '../utils';

export default class UserService {
  public static getUserInfo =
  async (email: string, password: string): Promise<IUserToken | undefined> => {
    const user: IUser | null = await User.findOne({ where: { email } });

    if (!user || !user.id || !CryptPass.verify(password, user?.password || '')) return undefined;

    const userInfo: IUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const result = {
      user: userInfo,
      token: await Token.generate(userInfo),
    };
    return result as IUserToken;
  };

  public static getUserRole = async (token: string): Promise<string | undefined> => {
    const email = await Token.verify(token);
    if (!email) return undefined;
    const user: IUser | null = await User.findOne({ where: { email } });
    if (!user) return undefined;
    return user.role;
  };
}
