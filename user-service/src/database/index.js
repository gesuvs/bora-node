import { Sequelize } from 'sequelize';
import config from '../config/database';
// import User from '../models/User';

const connection = new Sequelize(config);

// User.init(connection);

export default connection;
