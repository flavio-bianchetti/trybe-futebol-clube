import { ILeaderboard, IMatch, ITeam } from '../interfaces';
import Match from '../models/Match';
import Team from '../models/Team';

export default class LeaderboardService {
  private static getTotalPoints = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam === id && homeTeamGoals > awayTeamGoals) return sum + 3;
      if (homeTeam === id && homeTeamGoals === awayTeamGoals) return sum + 1;
      return sum;
    }, 0);

  private static getTotalVictories = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam === id && homeTeamGoals > awayTeamGoals) return sum + 1;
      return sum;
    }, 0);

  private static getTotalGames = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam }) =>
      (id === homeTeam ? sum + 1 : sum), 0);

  private static getTotalDraws = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam === id && homeTeamGoals === awayTeamGoals) return sum + 1;
      return sum;
    }, 0);

  private static getTotalLosses = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeam === id && homeTeamGoals < awayTeamGoals) return sum + 1;
      return sum;
    }, 0);

  private static getGoalsFavor = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, homeTeamGoals }) => {
      if (homeTeam === id) return sum + homeTeamGoals;
      return sum;
    }, 0);

  private static getGoalsOwn = (id: number, selectedMatches: IMatch[]): number =>
    selectedMatches.reduce((sum: number, { homeTeam, awayTeamGoals }) => {
      if (homeTeam === id) return sum + awayTeamGoals;
      return sum;
    }, 0);

  private static getGoalsBalance = (id: number, selectedMatches: IMatch[]): number =>
    this.getGoalsFavor(id, selectedMatches) - this.getGoalsOwn(id, selectedMatches);

  private static getEfficiency = (id: number, selectedMatches: IMatch[]): number =>
    Number(((this.getTotalPoints(id, selectedMatches)
    / (this.getTotalGames(id, selectedMatches) * 3)) * 100).toFixed(2)) || 0.00;

  private static getResults = (teams: ITeam[], matches: IMatch[]): ILeaderboard[] => {
    const result: ILeaderboard[] = [];

    for (let index = 0; index < teams.length; index += 1) {
      result.push({
        name: teams[index].teamName,
        totalPoints: this.getTotalPoints(teams[index].id, matches),
        totalGames: this.getTotalGames(teams[index].id, matches),
        totalVictories: this.getTotalVictories(teams[index].id, matches),
        totalDraws: this.getTotalDraws(teams[index].id, matches),
        totalLosses: this.getTotalLosses(teams[index].id, matches),
        goalsFavor: this.getGoalsFavor(teams[index].id, matches),
        goalsOwn: this.getGoalsOwn(teams[index].id, matches),
        goalsBalance: this.getGoalsBalance(teams[index].id, matches),
        efficiency: this.getEfficiency(teams[index].id, matches),
      } as ILeaderboard);
    }
    return result;
  };

  private static sortResults = (result: ILeaderboard[]): ILeaderboard[] =>
    result.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;
      return 0;
    });

  public static findAll = async (): Promise<ILeaderboard[]> =>
    this.sortResults(this.getResults(
      await Team.findAll(),
      await Match.findAll({ where: { inProgress: false } }),
    ));
}
