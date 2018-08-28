'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [
    {
      name: 'John Doe',
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    },
    {
      name: 'Kamal Hosny',
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    },
    {
      name: 'Carles Iborra',
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01')
    }], { logging: true, individualHooks: true });
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
