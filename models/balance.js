'use strict';
module.exports = (sequelize, DataTypes) => {

  // Model Definition
  const Balance = sequelize.define('Balance', {
    amount: {
      type: DataTypes.FLOAT,
      validate: {
        notLessThanZero(value){
          if(value <= 0 ) throw new Error('Your Balance is not enough for this transaction')
        },
      }
    },
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: 'id'
      }
    }
  }, {
    version: true
  });

  // Associations
  Balance.associate = function(models) {
    Balance.belongsTo(models.Account);
  };

  return Balance;
};