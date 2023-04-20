const { request, response } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async(req = request, res = response ) =>  {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);
    
    res.json({
        total,
        usuarios
    });
};

const userPut = async(req, res = response ) =>  {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // validar contra DB
    if ( password ) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json( usuario );
};

const userPost = async(req, res = response ) =>  {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // grabar usuario
    await usuario.save();    

    res.json({
        'msg': 'POST API - Controller',
        usuario
    });
};

const userDelete = async(req, res = response ) =>  {
    const { id } = req.params;

    const usuarioValidado = req.usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});

    res.json({
        usuario,
        usuarioValidado
    });
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};