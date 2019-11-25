const { Router } = require("express");
const Ticket = require("./model");

const router = new Router();

router.get("/tickets", async (req, res, next) => {
  const allTickets = await Ticket.findAll();
  res.send(allTickets);
});

router.post("/ticket", async (req, res, next) => {
  const ticket = {
    description: req.body.description,
    picture: req.body.picture,
    price: req.body.price,
  };
  const newTicket = await Event.create(ticket);
  res.send(newTicket);
});

module.exports = router;
