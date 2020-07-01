'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
            Add altering commands here.
            Return a promise to correctly handle asynchronicity.

            Example:
            return queryInterface.bulkInsert('People', [{
                name: 'John Doe',
                isBetaMember: false
            }], {});
        */
        return queryInterface.bulkInsert('Users', [
            {
                id: 1000001,
                pseudo: 'Florian',
                email: 'florian@hotmail.fr',
                password: 'encryptedFlorian',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1000002,
                pseudo: 'Thomas',
                email: 'thomas.75@gmail.com',
                password: 'encryptedThomas',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1000003,
                pseudo: 'Adrien',
                email: 'AdrienXx75@laposte.fr',
                password: 'ecryptedAdrien',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
  },

  down: (queryInterface, Sequelize) => {
        /*
            Add reverting commands here.
            Return a promise to correctly handle asynchronicity.

            Example:
            return queryInterface.bulkDelete('People', null, {});
        */
       return queryInterface.bulkDelete('Users', null, {})
  }
};
