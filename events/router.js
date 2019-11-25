const { Router } = require("express");
const Event = require("./model");

const router = new Router();

router.get("/events", async (req, res, next) => {
  const allEvents = await Event.findAll();
  res.send(allEvents);
});

router.post("/event", async (req, res, next) => {
  const event = {
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };
  const newEvent = await Event.create(event);
  res.send(newEvent);
});

module.exports = router;
