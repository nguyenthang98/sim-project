const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'sim-frontend/dist/sim-frontend')));
app.use('/', express.static(path.join(__dirname, 'sim-frontend/dist/sim-frontend')));


module.exports = app;
