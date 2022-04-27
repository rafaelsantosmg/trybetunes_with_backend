'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'description',
     { type: Sequelize.STRING });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('users', 'description');
  }
};