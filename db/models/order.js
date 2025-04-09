const { DataTypes, Model } = require('sequelize');

class Order extends Model {
  //static or factory methods
  //instance methods
}

exports.init = function(sequelize) {
  return Order.init({
    number: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    hooks: {},
    tableName: "orders",
    underscored: true,
    sequelize,
  });
}