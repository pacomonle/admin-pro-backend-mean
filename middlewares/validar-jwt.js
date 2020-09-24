const jwt = require('jsonwebtoken');
// importar dotenv
require('dotenv').config();


const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        // destructuring del payload del token
       const {uid, role} = jwt.verify( token, process.env.SEED );
       console.log(uid, role)
       req.uid = uid;
       req.role = role
     
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}

// =====================
// Verifica AdminRole
// =====================
const verificaAdmin_Role = (req, res, next) => {
  
    const role = req.role;
    console.log(role)

    if (role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    
};



module.exports = {
    validarJWT,
    verificaAdmin_Role
}