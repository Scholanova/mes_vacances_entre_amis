'use strict';
module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        name: DataTypes.STRING
    }, {});
    Expense.associate = function(models) {
        //* Expense have multiple Participant but Participant belongs to one Expense
        //*     - Add a expenseId column to model Participant
        Expense.hasMany(models.Participant, { foreignKey: 'expenseId' });

        //* Expense belongs to one Event
        //*     - Add field: eventId
        //*     - Add method: getEvent()
        Expense.belongsTo(models.Event, { foreignKey: 'eventId' });
    };
    return Expense;
};