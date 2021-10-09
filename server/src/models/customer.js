const Sequelize = require('sequelize');

const sequelize = require('../db/DB');

const Customer = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
      type:Sequelize.STRING,
    allowNull: false
},
  email: Sequelize.STRING
});

module.exports = Customer;