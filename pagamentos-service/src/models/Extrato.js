import { Model, Sequelize } from 'sequelize';
import config from '../config/database';
const sequelize = new Sequelize(config);

class Extrato extends Model {}
Extrato.init(
  {
    id_extrato: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    saldo: DataTypes.FLOAT.UNSIGNED.ZEROFILL,
    data: DataTypes.DATE(),
    id_usuario: {
      type: DataTypes.UUID,
      foreignKey: true,
    }
  },
  {
    tableName: 'extrato',
    sequelize,
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: ['password'],
        },
      },
    },
  }
);
