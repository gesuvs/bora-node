require('dotenv/config');
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 15432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'user-db',
  define: {
    timestamps: true,
    underscored: true,
  },
};
