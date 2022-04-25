import { DataTypes, Model } from 'sequelize';
import db from '.';
import { IMatch } from '../interfaces';
import Team from './Team';
// import OtherModel from './OtherModel';

class Match extends Model<IMatch> {
  // public <campo>!: <tipo>;
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  modelName: 'match',
  // tableName: 'matches',
  timestamps: false,
});

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeamFkMatch' }); // as .... relacionamento
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeamFkMatch' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamFkTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'homeTeamFkTeam' });

export default Match;
