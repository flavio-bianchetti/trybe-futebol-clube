import { IMatchTeamsNames } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

export default class MatchService {
  public static findAll = async (): Promise<IMatchTeamsNames[]> => {
    const matches = await Match.findAll({ raw: true });
    const teams = await Team.findAll();
    const result = [];

    if (!matches) return [];

    for (let index = 0; index < matches.length; index += 1) {
      const teamHome = teams.find((team) => team.id === matches[index].homeTeam);
      const teamAway = teams.find((team) => team.id === matches[index].awayTeam);
      if (teamHome && teamAway) {
        result.push({
          ...matches[index],
          teamHome: { teamName: teamHome.teamName },
          teamAway: { teamName: teamAway.teamName },
        } as IMatchTeamsNames);
      }
    }
    return result;
  };
}
