'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("extrato", {
      id_extrato: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      saldo: Sequelize.FLOAT,
      data: Sequelize.DATE(),
      id_usuario: {
        type: Sequelize.UUID,
        foreignKey: true,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("extrato");
  }
};
