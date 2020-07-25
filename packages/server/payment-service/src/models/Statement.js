import { Model, Sequelize, DataTypes } from "sequelize";
import config from "../config/database";
const sequelize = new Sequelize(config);

class Statement extends Model {}
Statement.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    balance: {
      type: DataTypes.STRING
    },
    balanceTransact: {
      type: Sequelize.DOUBLE,
      field: "balance_transact"
    },
    transactType: {
      type: DataTypes.CHAR({
        length: 1,
        binary: false
      }),
      field: "transact_type",
      allowNull: false
    },
    oldBalance: {
      type: DataTypes.DOUBLE,
      field: "old_balance",
      defaultValue: 0,
      allowNull: false
    },
    wallet: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "fk_wallet",
      references: {
        model: "wallets",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  {
    tableName: "statements",
    timestamps: false,
    sequelize
  }
);

export default Statement;
