import { Model, Sequelize, DataTypes } from "sequelize";
import config from "../config/database";
const sequelize = new Sequelize(config);

class Wallet extends Model {}
Wallet.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    }
  },
  {
    tableName: "wallets",
    sequelize
  }
);

export default Wallet;
