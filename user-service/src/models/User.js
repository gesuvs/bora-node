import { Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        mail: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        tableName: 'tb_users',
        sequelize,
      }
    );
    User.beforeCreate(
      async user =>
        await bcryptjs
          .hash(user.password, 10)
          .then(hash => {
            user.password = hash;
          })
          .catch(err => {
            throw new Error();
          })
    );
  }
}
