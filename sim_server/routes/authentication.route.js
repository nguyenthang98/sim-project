var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');

router.post('/register', (req, res) => {
    ctrlAuth.register(req, res);
});

router.post('/login', (req, res) => {
    ctrlAuth.login(req, res);
});

module.exports = router;
