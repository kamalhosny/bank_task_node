'use strict';
const Account = require('../models').Account

module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    amount: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0
      }
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
  Balance.associate = function(models) {
    Balance.belongsTo(models.Account);
  };

  return Balance;
};