const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middleware");

const router = new Router();

router.get("/comments/:ticketId", async (req, res, next) => {
  const { ticketId } = req.params;
  const allComments = await Comment.findAll({
    where: { ticketId }
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
  res.send(newComment);
});

module.exports = router;
