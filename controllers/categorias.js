const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    const [total, categorias ] = await Promise.all([ 
        Categoria.count(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total,
      categorias  
    });
}

// obtenerCategoria - populate
const obtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    })
}

// crea categoria

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);




}

//update categoria
const updateCategoria = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body; //se destructura lo que no quiero cambiar

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id; //actualizar el usuario que modifico 

    // todo validar contra la base de datos
    const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true});

    res.json({
        categoria
    });
}

//delete categoria 
const categoriaDelete = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado : false}, { new: true});

    res.json({
        categoria
    });
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    updateCategoria,
    categoriaDelete
}