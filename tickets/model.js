const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../events/model");
const User = require("../users/model");

const Ticket = db.define(
  "tickets",
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

Ticket.belongsTo(Event);
Ticket.belongsTo(User);

module.exports = Ticket;
