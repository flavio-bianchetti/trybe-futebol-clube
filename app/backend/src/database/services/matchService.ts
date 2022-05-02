import { IMatch } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

export default class MatchService {
  public static findAll = async (): Promise<IMatch[]> => { // resolver este problema: Retorna IMatchTeamsNames[]
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      raw: true,
    });
    return matches;
  };
}
