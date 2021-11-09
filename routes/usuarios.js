const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosPut, usuariosPost, usuariosDelete, userGet } = require('../controllers/usuarios');

const { esRoleValido, esEmailValido, existeUsuarioPorId, esUsuarioValido } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const  { validarCampos, validarJWT, esAdminRole,tieneRole} = require('../middlewares');

const router = Router();

router.get('/', usuariosGET);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(), //valida si el id existe
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userGet);

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'MECANICO'),
    check('id', 'No es un ID válido').isMongoId(), //valida si el id existe
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

router.post('/', [
    validarJWT,
    tieneRole('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    // check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La password es obligatoria y debe ser de más de 6 letras').isLength({ min: 6 }),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('username').custom(esUsuarioValido),
    check('rol').custom( esRoleValido ),
    // check('correo').custom( esEmailValido ),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN'),
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(), //valida si el id existe
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;