const md5 = require('md5');
const fs = require('fs');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index.js');
const Image = models.Image;
const dataPath = require('config').dataPath;

module.exports.changeAvatar = function(req, res) {
    console.log(req);
    res.send(
        jsonResponse(errorCodes.SUCCESS, 'Change-avatar-success', 'Successful')
    );
};
