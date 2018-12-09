const md5 = require('md5');
const fs = require('fs');
const jsonResponse = require('../response');
const errorCodes = require('../errorCodes').CODES;
const models = require('../models/index.js');
const User = models.User;
const Project = models.Project;
const dataPath = require('config').dataPath;
const avatarPath = 'avatars/';

module.exports.changeAvatar = function (req, res) {
    User.find({ where: { username: req.decoded.username } }).then(user => {
        if (user) {
            user.update({
                avatar: avatarPath + req.files[0].filename
            })
            res.send(jsonResponse(errorCodes.SUCCESS, 'Change avatar successful', avatarPath + req.files[0].filename));
        } else {
            res.send(jsonResponse(errorCodes.ERROR_USER_EXISTED, 'User not exists'));
        }
    })
};

module.exports.newProject = function(req, res) {
    const data = {
        idUser: req.decoded.idUser,
        projectInfo: req.body.projectInfo,
        projectName: req.body.projectName
    };

    Project.findOne({
        where: {
            idUser: data.idUser,
            projectName: data.projectName
        }
    }).then(project => {
        if(!project) {
            Project.create(data)
                .then(result => {
                    res.send(jsonResponse(errorCodes.SUCCESS, 'CREATE PROJECT SUCCESS', result));
                })
                .catch(err => {
                    res.send(jsonResponse(500, err.errors[0].message));
                })
        } else {
            res.send(jsonResponse(500, "PROJECT EXISTED"))
        }
    })
}

module.exports.listProject = function(req, res) {
    const data = {
        idUser: req.decoded.idUser
    };

    Project.findAll({
        attributes: ['projectName', 'idProject'],
        where: data 
    }).then(projects => {
        if(projects) {
            res.send(jsonResponse(errorCodes.SUCCESS, "LIST PROJECTS SUCCESS", projects));
        } else {
            res.send(jsonResponse(500, "USER PROJECTS NOT FOUND"));
        }
    }).catch(err => {
        res.send(jsonResponse(500, "LIST PROJECT ERROR", err.errors[0].message));
    })
}

module.exports.deleteProject = function(req, res) {
    const data = {
        idUser: req.decoded.idUser,
        idProject: req.body.idProject
    }

    Project.findOne({
        where: data
    }).then(project => {
        if(project) {
            project.destroy()
                .then(result => {
                    res.send(jsonResponse(
                            errorCodes.SUCCESS,
                            'DELETE PROJECT SUCCESS',
                            result));
                }) 
                .catch(err => {
                    res.send(jsonResponse(
                            errorCodes.ERROR_DELETE_DENIED,
                            `ERROR WHEN DELETE PROJECT`,
                            err.errors[0].message));
                })
        } else {
            res.send(jsonResponse(
                    errorCodes.ERROR_DELETE_DENIED,
                    `PROJECT NOT EXISTS`,
                    `CAN NOT DELETE PROJECT`));
        }
    }).catch(err => {
        res.send(jsonResponse(500, err.errors[0].message));
    })
}

module.exports.infoProject = function(req, res) {
    const data = {
        idUser: req.decoded.idUser,
        idProject: req.body.idProject
    }

    Project.findOne({
        where: data
    }).then(project => {
        if(project) {
            res.send(jsonResponse(errorCodes.SUCCESS, "GET INFO PROJECT SUCCESS", project))
        } else {
            res.send(jsonResponse(500, "PROJECT NOT FOUND"));
        }
    }).catch(err => {
        res.send(jsonResponse(500, err.errors[0].message))
    })
}

module.exports.updateProject = function(req, res) {
    const data = {
        idUser: req.decoded.idUser,
        idProject: req.body.idProject,
        projectInfo: req.body.projectInfo,
        projectName: req.body.projectName
    };

    Project.findOne({
        where: {
            idUser: data.idUser,
            idProject: data.idProject
        }
    }).then(project => {
        if(project) {
            project.update({
                projectInfo: data.projectInfo,
                projectName: data.projectName
            }).then(result => {
                res.send(jsonResponse(errorCodes.SUCCESS, "UPDATE PROJECT SUCCESS", result));
            }).catch(err => {
                res.send(jsonResponse(500, err.errors[0].message));
            })
        } else {
            res.send(jsonResponse(500, "PROJECT NOT EXISTED"));
        }
    }).catch(err => {
        res.send(jsonResponse(500, err.errors[0].message));
    })
}