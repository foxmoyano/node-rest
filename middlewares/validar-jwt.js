const { request, response } = require('express');
const Usuario = require('../models/user');
const jwt = require('jsonwebtoken');

const validarJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token')

    if ( !token ) {
        return res.status(400).json({
            msg: 'No hay token'        }
        );
    } 

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado false'
            });
        }

        req.usuario = usuario;

        next();    
    } catch ( error ) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
};
