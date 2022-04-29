import { Request, Response } from 'express';
import { UserService } from '../services';

export default class UserController {
  public static create = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await UserService.getUserInfo(email, password);

      if (!result) return res.status(401).json({ message: 'Incorrect email or password' });

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  };

  public static getRole = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization || '';
      const result = await UserService.getUserRole(token);

      if (!result) return res.status(401).json({ message: 'Unauthorized' });

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  };
}
