const mongoose = require('mongoose');

const Role = require('../models/role');
const Usuario = require('../models/Usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado`);
    };
};

const existeCorreo = async(correo = '') => {
    const esCorreoRepetido = await Usuario.findOne({ correo });
    if ( esCorreoRepetido ) {
        throw new Error(`El correo ya esta registrado`);
    };
}

const existeUsuarioById = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es válido`);
    }

    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id ${id} no existe`);
    };
}


module.exports = { 
    esRoleValido,
    existeCorreo,
    existeUsuarioById
};