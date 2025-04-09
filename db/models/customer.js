const { DataTypes, Model } = require('sequelize');

class Customer extends Model {
  //static or factory methods
  //instance methods
}

exports.init = function(sequelize) {
  return Customer.init({
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lifetimeValue: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    hooks: {},
    tableName: "customers",
    underscored: true,
    sequelize,
  });
}