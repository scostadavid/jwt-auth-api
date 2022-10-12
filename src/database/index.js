import config from '../config/db';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.DataTypes = Sequelize.DataTypes;
db.sequelize = sequelize;
db.User = require("../models/user.js")(sequelize, Sequelize.DataTypes);
db.Role = require("../models/role.js")(sequelize, Sequelize.DataTypes);
db.ROLES = ["user", "admin", "moderator"];

db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

module.exports = db;