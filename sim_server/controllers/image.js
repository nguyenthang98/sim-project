const md5 = require('md5');
const fs = require('fs');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index.js');
const Image = models.Image;
const dataPath = require('config').dataPath;

module.exports.newImage = (req, res) => {
    req.body.path = md5(req.body.name + req.body.idUser);
    Image.findOne({
        where: {
            name: req.body.name,
            idUser: req.body.idUser
        }
    }).then(image => {
        if (!image) {
            Image.create(req.body)
                .then(result => {
                    fs.mkdirSync(dataPath + '/' + req.body.path);
                    res.send(
                        jsonResponse(
                            errorCodes.SUCCESS,
                            'CREATE IMAGE SUCCESS',
                            result
                        )
                    );
                })
                .catch(err => {
                    res.send(jsonResponse(500, `IMAGE EXIST`, err));
                });
        } else {
            res.send(
                jsonResponse(500, 'IMAGE EXISTED', `CAN'T CREATE NEW IMAGE`)
            );
        }
    });
};

module.exports.infoById = (req, res) => {
    Image.findOne({
        where: {
            idImage: req.body.idImage
        }
    }).then(image => {
        res.send(
            jsonResponse(errorCodes.SUCCESS, 'GET INFO IMAGE SUCCESS', image)
        );
    });
};

module.exports.infoByName = (req, res) => {
    Image.findOne({
        where: {
            name: req.body.name,
            idUser: req.body.idUser
        }
    }).then(image => {
        res.send(
            jsonResponse(errorCodes.SUCCESS, 'GET INFO IMAGE SUCCESS', image)
        );
    });
};

module.exports.listImage = (req, res) => {
    Image.findAll({
        where: {
            idUser: req.body.idUser
        }
    }).then(images => {
        res.send(
            jsonResponse(errorCodes.SUCCESS, 'GET LIST IMAGES SUCCESS', images)
        );
    });
};

module.exports.downloadImage = (req, res) => {
    Image.findOne({
        where: {
            idImage: req.body.idImage
        }
    }).then(image => {
        let path = dataPath + '/' + image.path + '/' + image.name;
        if (fs.existsSync(path)) {
            res.download(path);
        } else {
            res.send(
                jsonResponse(500, `IMAGE NOT EXIST`, `CAN'T DOWNLOAD IMAGE`)
            );
        }
    });
};

module.exports.deleteImage = (req, res) => {
    Image.findOne({
        where: {
            idImage: req.body.idImage
        }
    }).then(image => {
        if (image) {
            image.destroy();
            deleteFolderRecursive(dataPath + '/' + image.path);
            res.send(
                jsonResponse(
                    errorCodes.SUCCESS,
                    'DELETE IMAGE SUCCESS',
                    image.idImage
                )
            );
        } else {
            res.send(
                jsonResponse(
                    errorCodes.ERROR_DELETE_DENIED,
                    `IMAGE NOT EXISTS`,
                    `CAN'T DELETE IMAGE`
                )
            );
        }
    });
};

let deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
