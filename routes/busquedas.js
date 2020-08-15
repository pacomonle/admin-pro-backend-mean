/*
    Ruta: /api/todo/:busqueda
*/

const { Router } = require('express');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT, verificaAdmin_Role  } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/:busqueda', 
          validarJWT, 
          getTodo );

router.get( '/coleccion/:tabla/:busqueda', 
          validarJWT, 
          getDocumentosColeccion );         


module.exports = router;