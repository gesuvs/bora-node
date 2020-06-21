import { Model, Sequelize, DataTypes } from 'sequelize';
import config from '../config/database';
const sequelize = new Sequelize(config);

class Wallet extends Model {}
Wallet.init(
  {
    id_wallet: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    balance: DataTypes.DOUBLE
  },
  {
    tableName: 'wallet',
    sequelize
  }
);

export default Wallet
