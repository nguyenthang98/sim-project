const express = require('express');
const router = express.Router();

const ctrlAuth = require('../controllers/authentication');

router.post('/register', (req, res) => {
    ctrlAuth.register(req, res);
});

router.post('/login', (req, res) => {
   ctrlAuth.login(req, res);
});

module.exports = router;
