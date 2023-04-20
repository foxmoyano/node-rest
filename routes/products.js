const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { obtenerTodosProductos,
        obtenerProductoById,
        crearProducto,
        actualizarProducto,
        eliminarProducto } = require('../controllers/products.controller');
const { existeCategoriaById,
        existeProductoById } = require('../helpers/db-validators');

const router = Router();

router.get('/', [    
], obtenerTodosProductos);

router.get('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos
], obtenerProductoById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaById ),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProductoById ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaById ),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProductoById ),    
    validarCampos    
], eliminarProducto );

module.exports = router;