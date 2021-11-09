const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    // token vacio
    if(!token){
        return res.status(401).json({ msg : "No hay token en la peticion" });
    }

    // "Valida Token"

    try {
        
        const { uid } = jwt.verify( token, "eST03SMyPub1ck3y23"); //valida token
        
        req.uid = uid; //colacando uid a la request

        const usuario = await Usuario.findById(uid); //leer usuario que solicita

        if(!usuario){
            return res.status(401).json({
                msg : 'Token no válido - Usuario no existe en DB'
            })
        }

        //verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg : 'Token no válido - Usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'token no valido'
        });
    }
}

module.exports = {
    validarJWT
}