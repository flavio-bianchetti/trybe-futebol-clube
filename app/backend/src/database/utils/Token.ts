import * as jwt from 'jsonwebtoken';
import FileHandler from './FileHandler';
import { IUser } from '../interfaces';

export default class Token {
  public static generate = async (data: IUser): Promise<string> => {
    const secret: string = await FileHandler.readFile('jwt.evaluation.key');
    const token = jwt.sign(
      { data },
      secret,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    return token;
  };

  public static verify = async (token: string): Promise<string | undefined> => {
    try {
      const secret: string = await FileHandler.readFile('jwt.evaluation.key');
      const decoded = jwt.verify(token, secret);
      if (typeof decoded === 'string') return undefined;
      return decoded.data.email ? decoded.data.email : undefined;
    } catch (err) {
      console.error(`Erro encontrado: ${err}`);
      return undefined;
    }
  };
}
