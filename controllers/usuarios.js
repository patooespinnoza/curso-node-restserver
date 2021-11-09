
const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGET = async(req, res = response) => {

    // const {q, nombre = 'No Name', apikey} = req.query; 
    // pagination con variable ?limite=5
    const {limite = 5, desde = 0, tipo = "MECANICO"} = req.query;
    const query = {estado:true, rol: tipo};
    // const usuarios = await Usuario.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado:true});

    // PROMESAS SIMULTANEAS
    const [total, usuarios ] = await Promise.all([ 
        Usuario.count(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json(
      usuarios
    );
};

const userGet = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, username, ...resto } = req.body; //se destructura lo que no quiero cambiar

    // todo validar contra la base de datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto );

    res.json({
        usuario
    });
}

const usuariosPost = async(req, res = response) => {
    
    const { nombre, apellido, telefono, username, correo, password, rol }  = req.body;

    const usuario = new Usuario( {nombre, correo, password, rol, apellido, username, telefono} );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en bd
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    // const uid = req.uid;
    //fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    // const uid = req.uid;
    // const usuarioAuth = req.usuario;
    //update
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json(
        usuario
    );
}

module.exports = {
    usuariosGET,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    userGet
}