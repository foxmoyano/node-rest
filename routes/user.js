const { Router } = require('express');
const { userGet,
        userPut,
        userPost,
        userDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { esRoleValido, existeCorreo, existeUsuarioById } = require('../helpers/db-validators');
const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeUsuarioById ),
    check('rol').custom( esRoleValido ),
    validarCampos
], userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({'min': 6}),
    check('correo').custom( existeCorreo ),
    check('rol').custom( esRoleValido ),
    validarCampos 
], userPost);

router.delete('/:id', [
    validarJWT,    
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    esAdminRole,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos 
], userDelete);

module.exports = router;