const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { correo, password } = req.body;
    
    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        //si el usuario esta activo // si el estado es false
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el Administrador'
        });
    }

    
}

const googleSignin = async(req, res=response) => {

    const { id_token } = req.body;

    try {

        const {correo, nombre, img} = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({correo});
        console.log(usuario);
        if(!usuario){
            //tengo que crearlo

            try {

                const data = {
                    nombre,
                    correo,
                    password: ':P',
                    img,
                    google: true,
                    rol: 'USER_ROLE'
                };
                usuario = new Usuario(data);
                await usuario.save();
                
            } catch (error) {
                console.log(error);
            }
        }
        //estado usuario
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token  de Google no es válido'
        })
    }


    
}


module.exports = {
    login,
    googleSignin
}