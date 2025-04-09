const { DataTypes, Model } = require('sequelize');

class Product extends Model {
  //static or factory methods
  //instance methods
}

exports.init = function(sequelize) {
  return Product.init({
    sku: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    hooks: {},
    tableName: "products",
    underscored: true,
    sequelize,
  });
}