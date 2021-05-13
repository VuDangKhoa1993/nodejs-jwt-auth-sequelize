
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    });
    return role;
}