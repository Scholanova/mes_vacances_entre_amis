'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: DataTypes.STRING,
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        place: DataTypes.STRING
    }, {});
    Event.associate = function(models) {
        // associations can be defined here
        Event.belongsToMany(models.User, { 
            through: 'UsersEvents',
            foreignKey: 'eventId'
        })
    };
    return Event;
};