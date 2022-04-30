import { Request, Response, NextFunction } from 'express';
import { Token } from '../utils';

export default class TokenValidator {
  public static validate =
  async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const token = req.params.authorization;
      const result = await Token.verify(token);
      if (!result) return res.status(401).json({ message: 'Invalid token' });
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
