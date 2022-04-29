import { IMatchTeamsNames } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

export default class MatchService {
  public static findAll = async (): Promise<IMatchTeamsNames[]> => {
    const matches = await Match.findAll();
    const result: IMatchTeamsNames[] = [];
    matches.forEach(async (match) => {
      const teamHome = await Team.findByPk(match.homeTeam);
      const teamAway = await Team.findByPk(match.awayTeam);
      if (teamHome && teamAway) {
        result.push({
          ...match,
          teamHome: { teamName: teamHome.teamName },
          teamAway: { teamName: teamAway.teamName },
        });
      }
    });
    return result;
  };
}
