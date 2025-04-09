const { DataTypes, Model } = require('sequelize');

class Inventory extends Model {
  //static or factory methods
  //instance methods
}

exports.init = function(sequelize) {
  return Inventory.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    stockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT
    },
    downloadUrl: {
      type: DataTypes.TEXT
    }
  }, {
    hooks: {},
    tableName: "inventory",
    underscored: true,
    sequelize
  });
}