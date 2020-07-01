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
        return queryInterface.bulkInsert('UsersEvents', [
            {
                id: 1000001,
                userId: 1000001,
                eventId: 1000001,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1000002,
                userId: 1000002,
                eventId: 1000001,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1000003,
                userId: 1000003,
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
    }
};
