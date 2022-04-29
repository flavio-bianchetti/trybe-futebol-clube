import IMatch from './IMatch';

export default interface IMatchTeamsNames extends IMatch {
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  }
}
