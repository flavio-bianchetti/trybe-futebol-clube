import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  public static findAll =
  async (_req: Request, res: Response): Promise<Response> => {
    try {
      const matches = await MatchService.findAll();
      return res.status(200).json(matches);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
