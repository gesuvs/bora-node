import { Sequelize, Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import config from '../config/database';
const sequelize = new Sequelize(config);

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: 'users',
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

User.beforeCreate(async user => {
  const username = await user.username.toUpperCase();
  const mail = await user.mail.toLowerCase();
  user.username = username;
  user.mail = mail;
});

export default User;
