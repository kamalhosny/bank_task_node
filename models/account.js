'use strict';
module.exports = (sequelize, DataTypes) => {

  // Model Definition
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
  }, {});

  // Associations
  Account.associate = function(models) {
    Account.hasOne(models.Balance);
    Account.hasMany(models.Transaction);
    Account.hasMany(models.BalanceTransfer);
  };


  // Validations

  //Callbacks
  Account.afterCreate((account) => {
    account.createBalance({ amount: 0 });
    return account;
  });

  return Account;
};