const { Router } = require("express");
const auth = require("../auth/middleware");
const Ticket = require("./model");
const User = require("../users/model");
const Event = require("../events/model");
const router = new Router();

router.get("/ticketsList", async (req, res, next) => {
  const fullTickets = await Ticket.findAll({
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });
  res.send(fullTickets);
});

router.get("/events/:eventId/tickets", async (req, res, next) => {
  const { eventId } = req.params;

  const allTickets = await Ticket.findAll({
    where: { eventId },
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });
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

  const inclTicket = await Ticket.findOne({
    where: { id: newTicket.id },
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });
  res.send(inclTicket);
});

router.put("/edit/:ticketId", auth, async (req, res, next) => {
  const { ticketId } = req.params;
  const ticketToUpdate = await Ticket.findByPk(ticketId)
  const updatedTicket = await ticketToUpdate.update(req.body)
  const allUpdatedTickets = await Ticket.findAll({
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  })
  res.send(allUpdatedTickets)
});

module.exports = router;
