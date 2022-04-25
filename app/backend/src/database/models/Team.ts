import { DataTypes, Model } from 'sequelize';
import db from '.';
import { ITeam } from '../interfaces';
import Match from './Match';
// import OtherModel from './OtherModel';

class Team extends Model<ITeam> {
  // public <campo>!: <tipo>;
  public id!: number;

  public teamName!: string;
}

Team.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  modelName: 'team',
  // tableName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
