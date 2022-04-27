import * as jwt from 'jsonwebtoken';
import FileHandler from './FileHandler';
import { IUser } from '../interfaces';

export default class Token {
  public static async generate(data: IUser): Promise<string> {
    const secret: string = await FileHandler.readFile('jwt.evaluation.key');
    const token = jwt.sign(
      { data },
      secret,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    return token;
  }
}
