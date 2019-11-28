const Sequelize = require("sequelize");
const db = require("../db");

const User = require('../users/model')

const Event = db.define(
  "events",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    timestamps: true,
    updatedAt: false
  }
);

Event.belongsTo(User)

module.exports = Event;