'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('User', [
      { username: 'John Doe', email: 'john@doe.com', password: '12345678'},
      { username: 'Donkey Kong', email: 'dk@nintendo.com', password: '12345678'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
