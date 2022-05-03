import { IMatch } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

// resolver este problema: Retorna IMatchTeamsNames[]
// resolver problema do boleano
export default class MatchService {
  public static findAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      // solução adaptada do site:
      // https://stackoverflow.com/questions/57417141/sequelize-query-taking-too-long-time
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      raw: true,
      nest: true,
    });
    return matches;
  };

  public static create = async (match: IMatch): Promise<IMatch | undefined | null> => {
    if (match.homeTeam === match.awayTeam) return undefined;
    Team.findAll()
      .then((teams) => {
        const existsTeam1 = teams.find((team) => team.id === match.homeTeam);
        const existsTeam2 = teams.find((team) => team.id === match.awayTeam);
        if (!existsTeam1 || !existsTeam2) return null;
      });
    const result = await Match.create(match);
    if (!result) return undefined;
    return result;
  };
}
