import { Request, Response, NextFunction } from 'express';

export default class MatchValidatorMiddleware {
  public static validate =
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals || !inProgress) {
        return res.status(402).json({ message: 'Payment Required' });
      }
      if (
        typeof homeTeam !== 'number'
        || typeof awayTeam !== 'number'
        || typeof homeTeamGoals !== 'number'
        || typeof awayTeamGoals !== 'number'
        || typeof inProgress !== 'boolean') {
        return res.status(409).json({ message: 'Payment types error' });
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
