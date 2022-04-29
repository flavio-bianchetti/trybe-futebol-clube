import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  public static findAll =
  async (_req: Request, res: Response): Promise<Response> => {
    try {
      const teams = await TeamService.findAll();
      if (!teams) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(teams);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public static findByPk =
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id || typeof Number(id) !== 'number') {
        return res.status(421).json({ message: 'Invalid parameter' });
      }
      const team = TeamService.findByPk(Number(id));
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(team);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
