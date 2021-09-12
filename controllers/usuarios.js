const { response } = require('express');

const usuariosGET = (req, res = response) => {

    const {q, nombre = 'No Name', apikey} = req.query; 

    res.json({
        
        msg: 'get API - Controller',
        q,
        nombre,
        apikey
    })
};

const usuariosPut = (req, res = response) => {

    const id = req.params;

    res.json({
        msg: 'put API',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        msg: 'post API',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}

module.exports = {
    usuariosGET,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}