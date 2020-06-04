'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("carteira", {
      id_carteira: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_usuario: {
        type: Sequelize.UUID,
        foreignKey: true,
      },
      saldo: {
        type: Sequelize.DOUBLE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("carteira");
  },
};
