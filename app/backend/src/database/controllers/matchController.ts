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

  public static create =
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const result = await MatchService.create({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress,
      });
      if (result === undefined) {
        return res.status(401).json(
          { message: 'It is not possible to create a match with two equal teams' },
        );
      }
      if (result === null) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      return res.status(201).json(result);
    } catch (err) {
      console.error(`Erro inicial ${err}`);
      return res.status(500).json({ error: err });
    }
  };
}
