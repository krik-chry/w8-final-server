const { Router } = require("express");
const Event = require("./model");
const auth = require('../auth/middleware')

const router = new Router();

router.get("/events", async (req, res, next) => {
  const allEvents = await Event.findAll({
    order: [['id', 'DESC']]
  });
  res.send(allEvents);
});

router.post("/event", auth, async (req, res, next) => {
  const userId  = req.user.id

  const event = {
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: userId
  };
  
  const newEvent = await Event.create(event);
  res.send(newEvent);
});

module.exports = router;
