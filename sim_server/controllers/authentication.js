const md5 = require('md5');
const jwt = require('jsonwebtoken');
const jsonResponse = require('../response');
const models = require('../models/index');
const configApp = require('config').application;
const User = models.User;

module.exports.register = (req, res) => {
    req.body.password = md5(req.body.password);
    User.create(req.body)
        .then(result => {
            let token = jwt.sign(req.body, configApp.jwtSecretKey);
            res.send(jsonResponse(200, 'REGISTER SUCCESS', token));
        })
        .catch(err => {
            res.send(jsonResponse(500, 'REGISTER FAILED', err));
        });
};

module.exports.login = (req, res) => {
    req.body.password = md5(req.body.password);
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            res.send(
                jsonResponse(
                    500,
                    'LOGIN FAILED',
                    'USERNAME OR PASSWORD IS NOT TRUE'
                )
            );
        } else {
            if (user.password !== req.body.password) {
                res.send(
                    jsonResponse(
                        500,
                        'LOGIN FAILED',
                        'USERNAME OR PASSWORD IS NOT TRUE'
                    )
                );
            } else {
                let resUser = {
                    username: req.body.username,
                    password: req.body.password,
                    email: user.email
                };

                let token = jwt.sign(resUser, configApp.jwtSecretKey);
                res.send(jsonResponse(200, 'LOGIN SUCCESS', token));
            }
        }
    });
};
