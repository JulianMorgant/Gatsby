const express = require('express');
const router = express.Router();

const service = require('../../services/v1/user');

router.get('/getAll', service.getAll);

router.get('/:id', service.getById);

router.get('/', service.getByToken);

router.put('/add', service.add);

router.patch('/update', service.update);

router.delete('/delete', service.delete);

module.exports = router;