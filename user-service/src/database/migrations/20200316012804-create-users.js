'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.sequelize
    //   .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    //   .then(() => {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
    // });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
