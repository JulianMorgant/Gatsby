const express = require('express');
const router = express.Router();

const service = require('../../services/v1/me');

router.get('/', service.getByToken);

module.exports = router;