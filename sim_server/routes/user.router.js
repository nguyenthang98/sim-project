const express = require('express');
const router = express.Router();
const multer = require('multer');

const ctrlUser = require('../controllers/user');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'sim-data/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/change-avatar', upload.array('file'), (req, res) => {
    ctrlUser.changeAvatar(req, res);
});

module.exports = router;
