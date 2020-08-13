const jwt = require('jsonwebtoken');
// importar dotenv
require('dotenv').config();

const generarJWT = ( uid, role ) => {
// tenemos que devolver una promesa ya que crear usuario y login son async y necesitamos un await
    return new Promise( ( resolve, reject ) => {
        console.log(uid)
        const payload = {
            uid,
            role
            // añadir informacion no sensible
        };
    
        jwt.sign( payload, process.env.SEED, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

    });

}


module.exports = {
    generarJWT,
}