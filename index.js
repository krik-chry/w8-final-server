const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require('./users/router')
const eventRouter = require('./events/router')
const ticketRouter = require('./tickets/router')
const ticketDetailsRouter = require('./ticketDetails/router')
const loginRouter = require('./auth/router')

const app = express();
const port = 4000;

const corsMiddleware = cors();
const parserMiddleware = bodyParser.json();

app.use(corsMiddleware, parserMiddleware);
app.use(userRouter, eventRouter, ticketRouter, ticketDetailsRouter, loginRouter)

app.listen(port, () => console.log(`App listening to port ${port}`));