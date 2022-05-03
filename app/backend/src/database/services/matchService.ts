import { IMatch } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

// resolver este problema: Retorna IMatchTeamsNames[]
// resolver problema do boleano
export default class MatchService {
  public static findAll = async (): Promise<IMatch[]> => {
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
