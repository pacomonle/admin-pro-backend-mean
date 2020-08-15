/*
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarJWT, verificaAdmin_Role  } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', getHospitales );

router.post( '/',
[
    validarJWT,
    check('nombre', 'el nombre del hospital es obligatorio').not().isEmpty(),
    // el uid del creador es obligatorio pero va en el token
    validarCampos
], 
    crearHospital
);

router.put( '/:id',
    [
       
    ],
    actualizarHospital
);

router.delete( '/:id',
   // validarJWT,
   //  verificaAdmin_Role,
    borrarHospital
);



module.exports = router;
