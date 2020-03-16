import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        tableName: 'tb_users',
        sequelize,
      }
    );
    User.associations = ({ AuthToke }) => {
      User.hasMany(AuthToke);
    };
  }
}
