'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: DataTypes.STRING,
        dateStart: DataTypes.DATE,
        dateEnd: DataTypes.DATE,
        place: DataTypes.STRING
    }, {});
    Event.associate = function(models) {
        //* User have multiple Event & Event have multiple User
        Event.belongsToMany(models.User, { through: 'UsersEvents', foreignKey: 'eventId' })
        
        //* Event have multiple Expense but a Expense have one Event
        //*     - Add column Expense: eventId
        Event.hasMany(models.Expense, { foreignKey: 'eventId' })
    };
    return Event;
};