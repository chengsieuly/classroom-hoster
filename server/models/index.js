/*
 * Dynamically create the tables!
 * http://docs.sequelizejs.com/en/1.7.0/articles/express/
 * Without the docs, setting up models dynamically would had
 * been a lot tricker
 *
 * The aim of this file is to read from the current directory
 * and grab all the models we have and then import it via
 * sequelize.import. sequelize.import passes the 'sequelize'
 * object and 'DataTypes' to a callback function where
 * we can define our tables. After that is done, we store
 * tables for reference inside an object that we can pass around
 * between files. Also, we can add association via an 'associate'
 * method in the define method of the table.
 **/


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.configuration
);

// NOTE: Using force is dangerous! This will literally wipe all your data
// from your database if any row is off
// However, great for testing...
sequelize.sync({ force: true });

sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to database'))
  .catch(err => console.error(err));

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
