const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    const respond = {
        message: "got cha"
    }
    res.end(JSON.stringify(respond));
});

module.exports = router;