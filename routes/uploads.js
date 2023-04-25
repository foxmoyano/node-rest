const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary, mostrarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas ( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen);

module.exports = router;