const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const authApiRouter = require('./sim_server/routes/authentication.route');

const port = 3000;

// Cross Origin Error
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'sim_client/dist/sim_client')));
app.use(
    '/',
    express.static(path.join(__dirname, 'sim_client/dist/sim_client'))
);

app.use('/auth', authApiRouter);

server.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;
