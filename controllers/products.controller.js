const { request, response } = require('express');
const Producto  = require('../models/product');

const obtenerTodosProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, productos ] = await Promise.all([
        Producto.count(query)        
            .limit(Number(limite))
            .skip(Number(desde)),
            Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        productos
    });    
}

const obtenerProductoById = async ( req = request, res = response ) => {
    const { id }  = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre');

    res.json({
        producto
    });
}

const crearProducto = async (req, res = response ) => {
    const nombre = req.body.nombre.toUpperCase();
    const { estado, precio, descripcion, categoria } = req.body;
    const productoDB = await Producto.findOne({ nombre });    
    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        estado, 
        precio,
        descripcion,        
        categoria,
        usuario: req.usuario._id,
    }

    const producto = new Producto( data );
    await producto.save();
    res.status(201).json(producto);
}

const actualizarProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre
    }
    console.log(1);
    const productoExiste = await Producto.findOne({ nombre, _id: { $ne: id } });
    if ( productoExiste ) {
        return res.status(400).json({
            msg: `El producto ${productoExiste.nombre} ya existe`
        });
    }    

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto); 
}

const eliminarProducto = async(req = request, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        producto
    });
}

module.exports = {
    obtenerTodosProductos,
    obtenerProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}