const { request, response } = require('express');
const Categoria = require('../models/category');

const obtenerTodasCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, categorias] = await Promise.all([
        Categoria.count(query)        
            .limit(Number(limite))
            .skip(Number(desde)),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        categorias
    });    
}

const obtenerCategoriaById = async ( req = request, res = response ) => {
    const { id }  = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json({
        categoria
    });
}

const crearCategoria = async (req, res = response ) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });    
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json(categoria);
}

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre
    }

    const categoriaExiste = await Categoria.findOne({ nombre });
    if ( categoriaExiste ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaExiste.nombre} ya existe`
        });
    }    

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria); 
}

const eliminarCategoria = async(req = request, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        categoria
    });
}

module.exports = {
    obtenerTodasCategorias,
    obtenerCategoriaById,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}