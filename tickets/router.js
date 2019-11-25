const { Router } = require("express");
const Ticket = require("./model");
const auth = require("../auth/middleware");

const router = new Router();

router.get("/events/:eventId/tickets", async (req, res, next) => {
  const { eventId } = req.params;
  
  const allTickets = await Ticket.findAll({ where: { eventId } });
  res.send(allTickets);
});

router.post("/events/:eventId/ticket", auth, async (req, res, next) => {
  const userId = req.user.id;
  const { eventId } = req.params;

  const ticket = {
    description: req.body.description,
    picture: req.body.picture,
    price: req.body.price,
    userId: userId,
    eventId: eventId
  };
  const newTicket = await Ticket.create(ticket);
  res.send(newTicket);
});

module.exports = router;
