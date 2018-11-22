const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const ctrlImage = require('../controllers/image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileUrl = `sim-data/images/${req.decoded.username}`;
        if (!fs.existsSync(fileUrl)) {
            fs.mkdirSync(fileUrl);
        }
        cb(null, fileUrl + '/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });

router.post('/new', upload.array('file'), (req, res) => {
    ctrlImage.newImage(req, res);
});

router.post('/info-by-id', (req, res) => {
    ctrlImage.infoById(req, res);
});

router.post('/info-by-name', (req, res) => {
    ctrlImage.infoByName(req, res);
});

router.post('/list', (req, res) => {
    ctrlImage.listImage(req, res);
});

router.post('/download', (req, res) => {
    ctrlImage.downloadImage(req, res);
});

router.post('/delete', (req, res) => {
    ctrlImage.deleteImage(req, res);
});

module.exports = router;
