const { request, response } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response ) =>  {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        console.log(usuario);
        if ( !usuario ) {
            return res.status(400).json({
                msg: '[ Usuario / Password no con correctos ] - correo'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: '[ Usuario / Password no con correctos ] - estado: false'
            });
        }

        const validaPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validaPassword ) {
            return res.status(400).json({
                msg: '[ Usuario / Password no con correctos ] - password'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario, 
            token
        });        
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    login
};