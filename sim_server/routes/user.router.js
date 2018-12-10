const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const ctrlUser = require('../controllers/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'sim-data/avatars/');
    },
    filename: function (req, file, cb) {
        cb(null, req.decoded.username + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/change-avatar', upload.array('file'), (req, res) => {
    ctrlUser.changeAvatar(req, res);
});

router.post('/info', (req, res) => {
    ctrlUser.getInfo(req, res);
})

router.post('/new-project', (req, res) => {
    ctrlUser.newProject(req, res);
});

router.post('/update-project', (req, res) => {
    ctrlUser.updateProject(req, res);
})

router.post('/info-project', (req, res) => {
    ctrlUser.infoProject(req, res);
});

router.post('/list-projects', (req, res) => {
    ctrlUser.listProject(req, res);
});

router.post('/delete-project', (req, res) => {
    ctrlUser.deleteProject(req, res);
});

module.exports = router;
