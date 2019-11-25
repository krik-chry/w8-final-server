const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  },
  {
    timestamps: true,
    updatedAt: false
  }
);

module.exports = User;