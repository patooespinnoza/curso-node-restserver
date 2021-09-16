const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGET);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(), //valida si el id existe
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La password es obligatoria y debe ser de más de 6 letras').isLength({ min: 6 }),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    check('correo').custom( esEmailValido ),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(), //valida si el id existe
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;