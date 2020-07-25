"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("statements", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      balance_transact: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      transact_type: {
        type: Sequelize.CHAR({
          length: 1,
          binary: false
        }),
        allowNull: false
      },
      old_balance: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        field: "old_balance",
        allowNull: false
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      fk_wallet: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "wallets",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("statements");
  }
};
