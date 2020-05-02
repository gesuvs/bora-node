import { Sequelize, Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import config from '../config/database';
const sequelize = new Sequelize(config);
const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        is: [/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/],
      },
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        min: 11,
      },
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: 'users',
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

User.beforeCreate(async user => {
  if (strongRegex.test(user.password)) {
    await bcryptjs
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  } else {
    throw new Error('password ');
  }
});

User.beforeCreate(async user => {
  const username = await user.username.toUpperCase();
  const mail = await user.mail.toLowerCase();
  user.username = username;
  user.mail = mail;
});

User.beforeFind(async user => {
  if (user.where) {
    const userUpperCase = await user.where.username.toUpperCase();
    user.where.username = userUpperCase;
  }
});
export default User;
