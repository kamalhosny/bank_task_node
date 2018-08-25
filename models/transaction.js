'use strict';
const Account = require('../models').Account

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
  Transaction.beforeCreate((transaction) => {
    transaction.getAccount().then(acc => {
      acc.update({ balance: acc.balance + transaction.amount })
    })
    return transaction;
  });
  return Transaction;
};