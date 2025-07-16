'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contact', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      linkPrecedence: {
        type: Sequelize.ENUM('primary', 'secondary'),
        defaultValue: 'primary',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop ENUM type explicitly before dropping the table (for PostgreSQL compatibility)
    await queryInterface.dropTable('Contact');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Contact_linkPrecedence";'
    );
  },
};
