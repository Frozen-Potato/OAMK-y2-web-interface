const Sequelize = require('sequelize');
const db = {} 

const sequelize = new Sequelize("stolen-ebay", "root", "password", {
    host: "127.0.0.1",
    dialect: "mysql"
})

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ' + err);
  });


  db.sequelize = sequelize;
  db.Sequelize = sequelize; 

  module.exports = db;