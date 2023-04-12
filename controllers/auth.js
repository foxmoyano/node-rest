const { request, response } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'VENTAS_ROLE'
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });            
    } catch ( error ) {
        res.status(400).json({
            ok: false,
            msg: 'El Token ID no se pudo verificar',
            error
        });
    }
}

module.exports = {
    login,
    googleSignIn
};