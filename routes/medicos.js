/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT, verificaAdmin_Role  } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', getMedicos );

router.post( '/',
[
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    // validar el id del hospital con la database de mongoDB
    check('hospital','el hospital id debe de ser valido').isMongoId(),
    validarCampos
], 
    crearMedico
);

router.put( '/:id',
    [
       
    ],
    actualizarMedico
);

router.delete( '/:id',
   // validarJWT,
   //  verificaAdmin_Role,
    borrarMedico
);



module.exports = router;
