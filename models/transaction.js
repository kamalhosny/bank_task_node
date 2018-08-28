'use strict';
const winston = require('../lib/logger.js');
const Balance = require('./').Balance

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.FLOAT
    },
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: 'id'
      }
    }
  }, {});

  // Associations
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Account);
  };

  // Callbacks
  Transaction.beforeCreate( async transaction => {
    let account = await transaction.getAccount();
    let balance = await account.getBalance();
    let updated_balance = await balance.update({amount: balance.amount + transaction.amount});
  });

  return Transaction;
};
