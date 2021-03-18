const express = require('express');
const router = express.Router();

const service = require('../../services/v1/login');

router.post('/', service.login);

module.exports = router;