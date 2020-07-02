'use strict';
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }, {});
    Participant.associate = function(models) {
        //* Participant belongs to  User
        //*     - Add field: userId
        //*     - Add method: getUser()
        Participant.belongsTo(models.User, { foreignKey: 'userId' })

        //* Participant belongs to only one Expense
        //*     - Add field: expenseId
        //*     - Add method: getExpense()
        Participant.belongsTo(models.Expense, { foreignKey: 'expenseId' })
    };
    return Participant;
};