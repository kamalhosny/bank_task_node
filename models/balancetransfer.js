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
      },
      validate:{
        async accountExists(acc_id){
          let result = await sequelize.models.Account.findById(acc_id)
          if(result){
            return result;
          }
          throw new Error('There is no actual account having this id')
        }
      }
    },
    toAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: 'id'
      },
      validate:{
        async accountExists(acc_id){
          let result = await sequelize.models.Account.findById(acc_id)
          if(result){
            return result;
          }
          throw new Error('There is no actual account having this id')
        }
      }
    }
  });

  // Associations
  BalanceTransfer.associate = function(models) {
    BalanceTransfer.belongsTo(models.Account, { as: 'fromAccount', foreignKey: 'fromAccountId' });
    BalanceTransfer.belongsTo(models.Account, { as: 'toAccount', foreignKey: 'toAccountId' });
  };

  // Callbacks
  BalanceTransfer.beforeCreate(transfer => {
    return sequelize.transaction(async function (t) {
        let fromAccount = await transfer.getFromAccount()
        let toAccount = await transfer.getToAccount()
        await fromAccount.createTransaction({ amount: -1 * transfer.transferedAmount }, {transaction: t})
        await toAccount.createTransaction({ amount: transfer.transferedAmount }, {transaction: t})
      }).then( result =>{
        winston.info(JSON.stringify(result));
      }).catch( err => {
        winston.error(err.message);
        throw new Error(err.message);
      })
  });

  return BalanceTransfer;
};