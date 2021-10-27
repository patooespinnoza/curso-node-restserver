const { response } = require("express");
const { Producto } = require('../models');

const obtenerProductos = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    const [total, productos ] = await Promise.all([ 
        Producto.count(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total,
      productos  
    });
}

const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    res.json({
        producto
    })
}

const crearProducto = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const {categoria, descripcion, precio, disponible}  = req.body;

    const productoDB = await Producto.findOne({ nombre });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria,
        descripcion,
        precio,
        disponible
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);




}

const updateProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body; //se destructura lo que no quiero cambiar

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id; //actualizar el usuario que modifico 

    // todo validar contra la base de datos
    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true});

    res.json({
        producto
    });
}

const productoDelete = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado : false}, { new: true});

    res.json({
        producto
    });
}

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    updateProducto,
    productoDelete
}