'use strict';
const winston = require('../lib/logger.js');

module.exports = (sequelize, DataTypes) => {
  const BalanceTransfer = sequelize.define('BalanceTransfer', {
    transferedAmount: DataTypes.FLOAT,
    fromAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: 'id'
      }
    },
    toAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: 'id'
      }
    }
  }, {});
  BalanceTransfer.associate = function(models) {
    BalanceTransfer.belongsTo(models.Account, { as: 'fromAccount', foreignKey: 'fromAccountId' });
    BalanceTransfer.belongsTo(models.Account, { as: 'toAccount', foreignKey: 'toAccountId' });
  };

  // Callbacks
  BalanceTransfer.beforeCreate((transfer) => {
    return sequelize.transaction(function (t) {
      return Promise.all([
        transfer.getFromAccount().then(acc => acc.createTransaction({ amount: -1 * transfer.transferedAmount })),
        transfer.getToAccount().then(acc => acc.createTransaction({ amount: transfer.transferedAmount }))
      ]).then(transactions => {
        return transactions;
      })

    }).then( result => {
      winston.info(JSON.stringify(result));
    }).catch( err => {
      winston.error(err);
      throw new Error(err);
    });
    return transfer;
  });
  return BalanceTransfer;
};