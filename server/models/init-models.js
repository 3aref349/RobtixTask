var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _feedback = require("./feedback");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var feedback = _feedback(sequelize, DataTypes);

  feedback.belongsTo(customers, { as: "cst", foreignKey: "cstId"});
  customers.hasMany(feedback, { as: "feedbacks", foreignKey: "cstId"});

  return {
    customers,
    feedback,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
