
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING 
    });
    return User;
}