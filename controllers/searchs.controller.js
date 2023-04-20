const { request, response } = require('express');
const { Usuario, Categoria, Role } = require('../models');
const Producto = require('../models/product');
const { ObjectId } = require('mongoose').Types

const colecciones = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '') => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const usuario = await Usuario.findById( termino );
        return usuario;
    }

    const regexp = new RegExp( termino, 'i');
    const usuarios = await Usuario.find({ 
        $or: [
            { nombre: regexp },
            { correo: regexp },
        ],
        $and: [
            { estado: true }
        ]
    });     

    return usuarios;
}

const buscarCategorias = async ( termino = '' ) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const categoria = await Categoria.findById( termino );
        return categoria;
    }

    const regexp = new RegExp( termino, 'i');
    const categorias = await Categoria.find({ 
        $or: [
            { nombre: regexp }
        ],
        $and: [
            { estado: true }
        ]
    }).populate('usuario', 'nombre');     

    return categorias;
}

const buscarProductos = async ( termino = '' ) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const producto = await Producto.findById( termino );
        return producto;
    }

    const regexp = new RegExp( termino, 'i');
    const productos = await Producto.find({ 
        $or: [
            { nombre: regexp }
        ],
        $and: [
            { estado: true }
        ]
    }).populate('usuario', 'nombre')
    .populate('categoria', 'nombre');     

    return productos;
}

const buscarRoles = async ( termino = '' ) => {
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const role = await Role.findById( termino );
        return role;
    }

    const regexp = new RegExp( termino, 'i');
    const roles = await Role.find({ 
        $or: [
            { rol: regexp }
        ]
    });     

    return roles;
}

const buscar = async (req = request, res = response) => {    
    const { coleccion, termino} = req.params;

    if ( !colecciones.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${colecciones}`
        });
    }

    switch ( coleccion ) {
        case 'usuarios':
            resultados = await buscarUsuarios( termino );
            break;
        case 'categorias':
            resultados = await buscarCategorias( termino );
            break;
        case 'productos':
            resultados = await buscarProductos( termino );
            break;
        case 'roles':
            resultados = await buscarRoles( termino );
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });
            break;                                                    
    }

    res.json(resultados);
}

module.exports = {
    buscar
}