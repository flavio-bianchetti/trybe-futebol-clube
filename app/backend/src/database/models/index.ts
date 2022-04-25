import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Match from './Match';
import Team from './Team';
import User from './User';

export default new Sequelize(config);

export {
  Match,
  Team,
  User,
}
