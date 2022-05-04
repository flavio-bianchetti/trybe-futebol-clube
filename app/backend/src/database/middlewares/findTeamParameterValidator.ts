import { Request, Response, NextFunction } from 'express';

export default class FindTeamParameterValidator {
  public static validate =
  (req: Request, res: Response, next: NextFunction): Response | undefined => {
    try {
      const { id } = req.params;
      if (!id || !Number(id)) {
        return res.status(421).json({ message: 'Invalid parameter' });
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  };
}
