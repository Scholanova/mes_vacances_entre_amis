'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    //* User have multiple Event & Event have multiple User
    User.belongsToMany(models.Event, { through: 'UsersEvents', foreignKey: 'userId' })
  };
  return User;
};