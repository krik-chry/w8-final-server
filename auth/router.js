const { Router } = require("express");
const bcrypt = require('bcrypt');
const { toJWT, toData } = require("./jwt");
const User = require("../users/model");
// const auth = require("./middleware");

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
            message: "You do not exist."
          });

        } else if (bcrypt.compareSync(password, user.password)) {          
          res.send({
            jwt: toJWT({ userId: user.id }),
            // user
          });
        } else {
          res.status(400).send({
            message: "You got your password wrong."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Something went fucky-uppy"
        });
      });
  }
});

module.exports = router;
