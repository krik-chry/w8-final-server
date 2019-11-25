const { Router } = require("express");
const Comment = require("./model");

const router = new Router();

router.get("/comments", async (req, res, next) => {
  const allComments = await Comment.findAll();
  res.send(allComments);
});

router.post("/comment", async (req, res, next) => {
  const comment = {
    text: req.body.text,
  };
  const newComment = await Event.create(comment);
  res.send(newComment);
});

module.exports = router;
