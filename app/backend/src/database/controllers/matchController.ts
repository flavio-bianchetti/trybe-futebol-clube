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

  public static finishMatch =
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await MatchService.finishMatch(Number(id));
      if (result === 0) {
        return res.status(400).json(
          { message: 'Match already finished or not found' },
        );
      }
      return res.status(200).json({ message: 'Match finished' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };

  public static updateMatch =
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await MatchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      if (result === 0) return res.status(400).json({ message: 'Match not found or changed' });
      return res.status(200).json({ message: 'Match updated' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  };
}
