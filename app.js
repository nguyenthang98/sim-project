const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const apiRouter = require("./sim-api/router");

// Cross Origin Error
app.use(cors());

app.use(express.static(path.join(__dirname, 'sim-frontend/dist/sim-frontend')));
app.use('/', express.static(path.join(__dirname, 'sim-frontend/dist/sim-frontend')));

app.use('/api', apiRouter);

module.exports = app;