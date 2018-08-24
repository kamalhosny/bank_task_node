const Sequelize = require('sequelize');
const winston = require('./lib/logger.js');
require('dotenv').config();

var config = require('../config/databaseConfig.js');
const sequelize = new Sequelize(config[process.env.NODE_ENV].database,
  config[process.env.NODE_ENV].username,
  config[process.env.NODE_ENV].password,
  config[process.env.NODE_ENV]);

sequelize
  .authenticate()
  .then(() => {
    winston.info('Database Connection has been established successfully.');
  })
  .catch(err => {
    winston.info(`Unable to connect to the database: ${err}`);
  });

module.exports = sequelize;
