const { Router } = require('express');
const { buscar } = require('../controllers/searchs.controller');

const router = Router();

router.get('/:coleccion/:termino', buscar );

module.exports = router;