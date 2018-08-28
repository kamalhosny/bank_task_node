'use strict';

class transferSerializer {
  static async serialize(transfer) {
    let fromAccount = await transfer.getFromAccount();
    let toAccount = await transfer.getToAccount();
    let fromAccountBalance = await fromAccount.getBalance();
    let toAccountBalance = await toAccount.getBalance();
    let jsonObject = {
      'transfer_id': transfer.id,
      'from':{
        'id': transfer.fromAccountId,
        'current_balance': fromAccountBalance.amount
      },
      'to':{
        'id': transfer.toAccountId,
        'current_balance': toAccountBalance.amount
      },
      'transfered_amount': transfer.transferedAmount
    }
    return jsonObject;
  }
}

module.exports = transferSerializer
