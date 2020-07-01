'use strict';
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }, {});
    Participant.associate = function(models) {
        // associations can be defined here
        Participant.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            sourceKey: 'id'
        })
    };
    return Participant;
};