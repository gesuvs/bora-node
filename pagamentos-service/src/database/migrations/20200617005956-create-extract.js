'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("extract", {
      id_extract: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      balance: {type : Sequelize.FLOAT},
      balance_transact: {type : Sequelize.FLOAT},
      transact_type: {type : Sequelize.STRING(1)},
      oldBalance : {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        field: 'old_balance'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      },
      wallet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model : 'wallet', key: 'id_wallet'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("extract");
  }
};