var express = require('express');
var router = express.Router();

const userRoute = require('./user');

router.get('/', async (req, res) => {
    console.log("router //");
    res.status(200).json({
        name   : 'API', 
        version: '1.0', 
        status : 200, 
        message: 'Bienvenue sur l\'API !'
    });
});

router.use('/users', userRoute);

module.exports = router;