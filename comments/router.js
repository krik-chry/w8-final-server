const { Router } = require("express");
const Comment = require("./model");

const router = new Router();

router.get("/:ticketId/comments", async (req, res, next) => {
  const { ticketId } = req.params
  const allComments = await Comment.findAll({where: {ticketId}});
  res.send(allComments);
});

router.post("/tickets/:ticketId/comment", async (req, res, next) => {
  const { ticketId } = req.params
  const comment = {
    text: req.body.text,
    ticketId: ticketId
  };
  const newComment = await Comment.create(comment);
  res.send(newComment);
});

module.exports = router;
