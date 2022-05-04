import * as Sequelize from 'sequelize';
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
    const teams = await Team.findAll(
      {
        // solução adaptada do site:
        // https://stackoverflow.com/questions/24920427/sequelize-error-when-using-where-and-in-on-a-subarray
        where: {
          id: { [Sequelize.Op.in]: [match.homeTeam, match.awayTeam] },
        },
        raw: true,
      },
    );

    if (teams.length !== 2) return null;

    const result = await Match.create(match);
    if (!result) return undefined;
    return result;
  };

  public static finishMatch =
  async (id: number): Promise<number> => {
    // solução adaptada do site:
    // https://stackoverflow.com/questions/38689561/typescript-incorrect-interface-for-sequelize-model-update
    const [rowsAffected] = await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return rowsAffected;
  };

  public static updateMatch =
  async (id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> => {
    const [rowsAffected] = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return rowsAffected;
  };
}
