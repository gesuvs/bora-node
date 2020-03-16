import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';

export const connection = new Sequelize(dbConfig);
