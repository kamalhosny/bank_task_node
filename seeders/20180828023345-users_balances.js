'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Balances', [
        {
          accountId: 1,
          amount: 100,
          createdAt: new Date('2018-08-01'),
          updatedAt: new Date('2018-08-01')
        },{
          accountId: 2,
          amount: 100,
          createdAt: new Date('2018-08-01'),
          updatedAt: new Date('2018-08-01')
        },{
          accountId: 3,
          amount: 100,
          createdAt: new Date('2018-08-01'),
          updatedAt: new Date('2018-08-01')
        }
        ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
