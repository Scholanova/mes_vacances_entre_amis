'use strict';
module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        name: DataTypes.STRING
    }, {});
    Expense.associate = function(models) {
        // associations can be defined here
        Expense.hasMany(models.Participant, {
            foreignKey: 'expenseId',
            sourceKey: 'id'
        })
    };
    return Expense;
};