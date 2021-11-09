const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    username: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        default: null
    },
    telefono: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function (){ //excluye datos para devolver en el json
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; //cambia llave de un dato del json
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);