const md5 = require('md5');
const path = require('path');
const fs = require('fs');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index.js');
const Image = models.Image;
const dataPath = require('config').dataPath;

module.exports.newImage = (req, res) => {
    req.body.idUser = req.decoded.idUser;
    let data = {
        idUser: req.decoded.idUser,
        name: req.files[0].originalname,
        path: req.files[0].path.replace('sim-data', '')
    }

    Image.findOne({
        where: {
            name: data.name,
            idUser: data.idUser
        }
    }).then(image => {
        if (!image) {
            Image.create(data)
                .then(result => {
                    res.send(
                        jsonResponse(
                            errorCodes.SUCCESS,
                            'CREATE IMAGE SUCCESS',
                            result
                        )
                    );
                })
                .catch(err => {
                    res.send(jsonResponse(500, err.errors[0].message));
                });
        } else {
            res.send(
                jsonResponse(500, 'IMAGE EXISTED')
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
        attributes: ['idImage', 'name', 'path'],
        where: {
            idUser: req.decoded.idUser
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
        let filePath = path.join(__dirname, '../../sim-data', image.path);
        if (fs.existsSync(filePath)) {
            // res.download(path);
            res.sendFile(filePath);
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
            let filePath = path.join(__dirname, '../../', dataPath + image.path);
            fs.unlinkSync(filePath);
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

let deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
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
