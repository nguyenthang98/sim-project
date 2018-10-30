const express = require('express');
const router = express.Router();

const ctrlImage = require('../controllers/image');

router.post('/new', (req, res) => {
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
