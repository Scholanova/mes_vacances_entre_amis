'use strict';
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        token: DataTypes.STRING
    }, {});
    Session.associate = function(models) {
        //* Session belongs to only one User
        //*     - Add field: userId
        //*     - Add method: getUser()
        Session.belongsTo(models.User, { foreignKey: 'userId' })
    };
    return Session;
};