const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);

const authApiRouter = require('./sim_server/routes/authentication.router');
const imageApiRouter = require('./sim_server/routes/image.router');
const userApiRouter = require('./sim_server/routes/user.router');

// Cross Origin Error
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'sim_client/dist/sim_client')));
app.use(express.static(path.join(__dirname, 'sim-data')));
app.use(
  '/**',
  express.static(path.join(__dirname, 'sim_client/dist/sim_client'))
);

const authFunc = require('./sim_server/controllers/authentication')
  .authenticate;
app.use('/api/auth', authApiRouter);
app.use('/api/image', authFunc(), imageApiRouter);
app.use('/api/user', authFunc(), userApiRouter);

module.exports = app;
