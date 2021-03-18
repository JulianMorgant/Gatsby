const express = require('express');
const router = express.Router();

const service = require('../../services/v1/user');
const { authenticateJWT } = require('../../utils/token');

router.get('/getAll',authenticateJWT, service.getAll);

router.get('/:id',authenticateJWT, service.getById);

router.get('/',authenticateJWT, service.getByToken);

router.put('/add',authenticateJWT, service.add);

router.patch('/update',authenticateJWT, service.update);

router.delete('/:id',authenticateJWT, service.delete);

module.exports = router;