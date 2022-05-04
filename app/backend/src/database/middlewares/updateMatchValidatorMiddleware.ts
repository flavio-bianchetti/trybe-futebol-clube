import { Request, Response, NextFunction } from 'express';
import { IGoals } from '../interfaces';

export default class UpdateMatchValidatorMiddleware {
  public static validate =
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals }: IGoals = req.body;

      if (!id || !Number(id)) {
        return res.status(421).json({ message: 'Invalid parameter' });
      }

      if (!homeTeamGoals || !awayTeamGoals) {
        return res.status(402).json({ message: 'Payment Required' });
      }

      if (typeof homeTeamGoals !== 'number' || typeof awayTeamGoals !== 'number') {
        return res.status(402).json({ message: 'Payment attributes must be numeric type' });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
