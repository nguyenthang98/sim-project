const md5 = require('md5');
const fs = require('fs');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index.js');
const User = models.User;
const dataPath = require('config').dataPath;

module.exports.changeAvatar = function (req, res) {
    User.find({ where: { username: req.decoded.username } }).then(user => {
        if (user) {
            user.update({
                avatar: req.files[0].filename
            })
            res.send(jsonResponse(errorCodes.SUCCESS, 'Change avatar successful', req.files[0].filename));
        } else {
            res.send(jsonResponse(errorCodes.ERROR_USER_EXISTED, 'User not exists'));
        }
    })
};
