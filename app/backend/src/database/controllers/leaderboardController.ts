import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  public static findAll =
  async (req: Request, res: Response) => {
    try {
      const result = await LeaderboardService.findAll();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
