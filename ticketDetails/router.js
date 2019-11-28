const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middleware");
const User = require("../users/model");
const Ticket = require("../tickets/model");
const router = new Router();

router.get("/commentsList", async (req, res, next) => {
  const fullComments = await Comment.findAll({
    include: [
      {
        model: Ticket,
        attributes: ["id"]
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
  });
  res.send(fullComments);
});

router.get("/comments/:ticketId", async (req, res, next) => {
  const { ticketId } = req.params;

  const allComments = await Comment.findAll({
    where: { ticketId },
    include: [
      {
        model: Ticket,
        attributes: ["eventId", "price"]
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
  });
  res.send(allComments);
});

router.post("/comments/:ticketId", auth, async (req, res, next) => {
  const userId = req.user.id;
  const { ticketId } = req.params;

  const comment = {
    text: req.body.text,
    ticketId: ticketId,
    userId: userId
  };
  const newComment = await Comment.create(comment);
  const inclComment = await Comment.findOne({
    where: { id: newComment.id },
    include: [
      {
        model: Ticket,
        attributes: ["eventId", "price"]
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
  })
  res.send(inclComment);
});

module.exports = router;
