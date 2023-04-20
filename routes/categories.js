const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { obtenerTodasCategorias, 
        obtenerCategoriaById, 
        crearCategoria, 
        actualizarCategoria, 
        eliminarCategoria } = require('../controllers/categories.controller');
const { existeCategoriaById, existeCategoriaByNombre } = require('../helpers/db-validators');

const router = Router();

router.get('/', [    
], obtenerTodasCategorias);

router.get('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeCategoriaById ),
    validarCampos
], obtenerCategoriaById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeCategoriaById ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( existeCategoriaByNombre ),
    validarCampos
], actualizarCategoria );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeCategoriaById ),    
    validarCampos    
], eliminarCategoria );

module.exports = router;
