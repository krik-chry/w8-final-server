const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");

const router = new Router();


router.get("/users", async (req, res, next) => {
  const allUsers = await User.findAll()
  res.send(allUsers)
});

router.post("/user", async (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  if (user.username && user.password && user.email) {
    
    const newUser = await User.create(user)
    res.send(newUser)
  }
});

module.exports = router;