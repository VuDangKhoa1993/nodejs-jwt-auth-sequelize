const config = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    {
        database: config.database,
        username: config.username, 
        password: config.password,
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            idle: config.pool.idle,
            acquire: config.pool.acquire
        }
    }
);

const db = { };
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const userModel = require('../models/user.model.js')(sequelize, Sequelize);
const roleModel = require('../models/role.model.js')(sequelize, Sequelize);

db.user = userModel;
db.role = roleModel;

db.role.belongsToMany(db.user, {
   through: 'user_roles',
   foreignKey: 'roleId',
   otherKey: 'userId'
});

db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});

db.ROLE = ['user', 'admin', 'moderator'];

module.exports = db;