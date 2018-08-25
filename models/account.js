'use strict';
const  Balance = require('../models').Balance
const  Transaction = require('../models').Transaction

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0
      }
    }
  }, {});

  // Associations
  Account.associate = function(models) {
    Account.hasMany(models.Balance);
    Account.hasMany(models.Transaction);
    Account.hasMany(models.BalanceTransfer);
  };


  // Validations

  // Callbacks
  Account.beforeSave((account) => {
    if (account.changed("balance") || account.isNewRecord) {
      account.createBalance({
        amount: account.balance
      })
    }
    return account;
  });

  return Account;
};