'use strict';
const winston = require('../lib/logger.js');
const Account = require('../models').Account;
const Balance = require('../models').Balance;
const Transaction = require('../models').Transaction;
const BalanceTransfer = require('../models').BalanceTransfer;

module.exports = function (router) {

  router.post('/transfer', function (req, res) {
    let fromId = Number(req.body.from);
    let toId = Number(req.body.to);
    let amount = Number(req.body.amount);

    BalanceTransfer.sequelize.transaction(function (t) {
      return BalanceTransfer.create({
        transferedAmount: amount,
        fromAccountId: fromId,
        toAccountId: toId
      },{ transaction: t})
    }).then( transfer => {
      winston.info(transfer);
      res.send(JSON.stringify(transfer, null, 2))
    }).catch(err => {
      winston.error(err);
    })
  });

};
