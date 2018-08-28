'use strict';
const httpStatus = require('http-status');
const winston = require('../lib/logger.js');
const Account = require('../models').Account;
const Balance = require('../models').Balance;
const Transaction = require('../models').Transaction;
const BalanceTransfer = require('../models').BalanceTransfer;
const transferSerializer = require('../serializers/balancetransferserializer')
const redisClient = require('../lib/redis.js');

module.exports = function (router) {

  router.post('/transfer', function (req, res) {
    let fromId = Number(req.body.from);
    let toId = Number(req.body.to);
    let amount = Number(req.body.amount);

    redisClient.set([`from_${fromId}_to_${toId}_with_${amount}`, '1', 'NX', 'EX', 10], function (error, result) {
      if(!result){
        res.status(httpStatus.BAD_REQUEST).json({'error': "you have a duplicate transactoin, if you are sure it's not by mistake then try again"})
      } else {
        BalanceTransfer.create({
          transferedAmount: amount,
          fromAccountId: fromId,
          toAccountId: toId
        }).then(
        transfer => {
          transferSerializer.serialize(transfer).then( serialized_transfer =>{
            res.json(serialized_transfer);
          });
        }).catch(err => {
          res.status(httpStatus.BAD_REQUEST).json({'error': err.message});
        })
      }
    })
  });

};
