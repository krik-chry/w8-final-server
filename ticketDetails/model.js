const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = require("../tickets/model");
const User = require('../users/model')

const Comment = db.define(
  "comments",
  {
    text: {
      type: Sequelize.TEXT,
      allowNull: false 
    }
  },
  {
    timestamps: true,
    updatedAt: false
  }
);

Comment.belongsTo(Ticket);
Comment.belongsTo(User)

module.exports = Comment;
