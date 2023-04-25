const mongoose = require('mongoose');

const Role = require('../models/role');
const Usuario = require('../models/user');
const Categoria  = require('../models/category');
const Producto = require('../models/product');

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
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id ${id} no existe`);
    };
}

const existeCategoriaById = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id ${id} no existe`);
    }        
}

const existeCategoriaByNombre = async ( nombre = '') => {    
    const existeCategoria = await Categoria.findOne({nombre});
    if ( existeCategoria ) {
        throw new Error(`La categoria ${nombre} ya existe`);
    };
}

const existeProductoById = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El ID ${id} no existe`);
    }        
}

const existeProductoByNombre = async ( nombre = '') => {    
    const existeProducto = await Producto.findOne({nombre});
    if ( existeProducto ) {
        throw new Error(`El producto ${nombre} ya existe`);
    };
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {        
        throw new Error(`La colección ${coleccion} no es permitida / ${colecciones}`);
    }

    return true;
}

module.exports = { 
    esRoleValido,
    existeCorreo,
    existeUsuarioById,
    existeCategoriaById,
    existeCategoriaByNombre,
    existeProductoById,
    existeProductoByNombre,
    coleccionesPermitidas
};