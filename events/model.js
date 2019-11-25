const Sequelize = require("sequelize");
const db = require("../db");

const User = require('../users/model')

const Event = db.define(
  "events",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 5
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        min: 10
      }
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: false
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