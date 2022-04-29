import { ITeam } from '../interfaces';
import Team from '../models/Team';

export default class TeamService {
  public static findAll = async (): Promise<ITeam[] | undefined> => {
    const teams = await Team.findAll();
    if (!teams) return undefined;
    return teams;
  };

  public static findByPk = async (id: number): Promise<ITeam | undefined> => {
    const team = await Team.findByPk(id);
    if (!team) return undefined;
    return team;
  };
}
