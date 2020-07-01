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
        return queryInterface.bulkInsert('Expenses', [
            {
                id: 1000001,
                name: 'Restaurant - Le tonton',
                eventId: 1000001,
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
        return queryInterface.bulkDelete('Expenses', null, {});
    }
};
