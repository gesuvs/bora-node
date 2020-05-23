import { Sequelize } from 'sequelize';
import config from '../config/database';

const connection = new Sequelize(config);

export default connection;
