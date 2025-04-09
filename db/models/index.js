const { Sequelize } = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const config = {
  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },
  development: {
    dialect: "sqlite",
    storage: "./db/dev.db",
  },
  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const sequelize =
  env === "production"
    ? new Sequelize(process.env.DATABASE_URL, config.production)
    : new Sequelize(config[env]);

//initialize models
const Customer = require("./customer").init(sequelize);
const Inventory = require("./inventory").init(sequelize);
const Order = require("./order").init(sequelize);
const Product = require("./product").init(sequelize);

//associations
//such as Customer.hasMany(Order)

const DB = {
  close() {
    sequelize.close();
  },
  async sync() {
    await sequelize.sync({
      force: true,
    });
    return "DONE";
  },
  async run(sql, opts = {}) {
    return sequelize.query(sql, opts);
  },
  async query(sql) {
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
  },
};

return {
  DB,
  Customer,
  Inventory,
  Order,
  Product,
};