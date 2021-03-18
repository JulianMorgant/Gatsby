


var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    console.log("router //");
    res.status(200).json({
        name   : 'Gatsby API', 
        version: '3.0', 
        status : 200, 
        message: 'Bienvenue Gatsby'
    });
});

module.exports = router;