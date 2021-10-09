const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    feedback: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cstId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "cstId_idx",
        using: "BTREE",
        fields: [
          { name: "cstId" },
        ]
      },
    ]
  });
};
