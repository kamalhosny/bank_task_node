'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [
    {
      name: 'John Doe',
      balance: 0,
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    },
    {
      name: 'Kamal Hosny',
      balance: 100,
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    },
    {
      name: 'Carles Iborra',
      balance: 10,
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    }], {});
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
