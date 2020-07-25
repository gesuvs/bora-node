import { Sequelize } from "sequelize";
import database from "../config/database";

const connection = new Sequelize(database);
export default connection;
