const md5 = require('md5');
const jwt = require('jsonwebtoken');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index');
const configApp = require('config').application;
const User = models.User;

const expiresValue = '72h';

module.exports.register = (req, res) => {
    req.body.password = md5(req.body.password);
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (!user) {
                    User.create(req.body).then(result => {
                        let token = jwt.sign(req.body, configApp.jwtSecretKey, {
                            expiresIn: expiresValue
                        });
                        console.log(req.body.username + ': REGISTER SUCCESS');
                        res.send(
                            jsonResponse(
                                errorCodes.SUCCESS,
                                'REGISTER SUCCESS',
                                token
                            )
                        );
                    });
                } else {
                    console.log(req.body.username + ': REGISTER FAILED');
                    res.send(
                        jsonResponse(
                            errorCodes.ERROR_USER_EXISTED,
                            'REGISTER FAILED',
                            'EMAIL_EXISTED'
                        )
                    );
                }
            });
        } else {
            console.log(req.body.username + ': REGISTER FAILED');
            res.send(
                jsonResponse(
                    errorCodes.ERROR_USER_EXISTED,
                    'REGISTER FAILED',
                    'USER_EXISTED'
                )
            );
        }
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
            console.log(req.body.username + ': LOGIN SUCCESS');
            res.send(
                jsonResponse(
                    errorCodes.ERROR_USER_NOT_EXISTS,
                    'LOGIN FAILED',
                    'USER_NOT_EXISTS'
                )
            );
        } else {
            if (user.password !== req.body.password) {
                console.log(req.body.username + ': LOGIN SUCCESS');
                res.send(
                    jsonResponse(
                        errorCodes.ERROR_WRONG_PASSWORD,
                        'LOGIN FAILED',
                        'WRONG_PASSWORD'
                    )
                );
            } else {
                let resUser = {
                    username: req.body.username,
                    password: req.body.password,
                    email: user.email
                };

                console.log(req.body.username + ': LOGIN SUCCESS');
                let token = jwt.sign(resUser, configApp.jwtSecretKey, {
                    expiresIn: expiresValue
                });
                res.send(
                    jsonResponse(errorCodes.SUCCESS, 'LOGIN SUCCESS', token)
                );
            }
        }
    });
};

module.exports.authenticate = () => {
    return (req, res, next) => {
        let token =
            req.body.token || req.query.token || req.headers.authorization;
        if (token) {
            jwt.verify(token, configApp.jwtSecretKey, (err, decoded) => {
                if (err) {
                    console.log(err);
                    console.log(req.body.username + ': AUTHENTICATE FAILED');
                    return res.send(
                        jsonResponse(
                            errorCodes.ERROR_WRONG_PASSWORD,
                            'Failed to authenticate'
                        )
                    );
                } else {
                    User.findOne({
                        where: {
                            username: decoded.username
                        }
                    }).then(user => {
                        if (user) {
                            req.decoded = user.toJSON();
                            next();
                        } else {
                            console.log(
                                req.body.username + ': AUTHENTICATE FAILED'
                            );
                            return res.send(
                                jsonResponse(
                                    errorCodes.ERROR_WRONG_PASSWORD,
                                    'Failed to authenticate'
                                )
                            );
                        }
                    });
                }
            });
        } else {
            return res.send(
                jsonResponse(
                    errorCodes.ERROR_WRONG_PASSWORD,
                    'No token provided'
                )
            );
        }
    };
};
