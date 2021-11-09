const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

// router.post('/google', [
//     check('id_token', 'El id_token es necesario').not().isEmpty(),
//     validarCampos
// ], googleSignin );


module.exports = router;