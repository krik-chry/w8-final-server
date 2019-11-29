const { Router } = require("express");
const bcrypt = require('bcrypt');
const { toJWT } = require("./jwt");
const User = require("../users/model");

const router = new Router();

router.post("/login", (req, res, next) => {
  const { password, email } = req.body;

  if (!email || !password ) {
    res.status(400).send({
      message: "Give me an email and a password"
    });
  } else {
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (!user) {
          res.status(400).send({
            message: "This e-mail is invalid"
          });

        } else if (bcrypt.compareSync(password, user.password)) {          
          res.send({
            jwt: toJWT({ userId: user.id }),
            username: user.username,
            id: user.id
          });
        } else {
          res.status(400).send({
            message: "Your password is wrong."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

module.exports = router;
