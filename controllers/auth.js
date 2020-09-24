const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no válida'
            });
        }
       console.log(usuarioDB.role)
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB._id, usuarioDB.role );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {
      // extraer datos del token de google
        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
    // si queremos que el usuario solo tenga un metodo de autenticacion hay que eliminar la que tenia antes
            //  password: '@@@'
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id, usuario.role );
        
        res.json({
            ok: true,
            msg:'Google signin',
           // name,
           // email,
           // picture,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
            error
        });
    }

}

// metodo para refresh token

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const role = req.role
    // console.log(uid)

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid, role );

     // Obtener el usuario por UID
     const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario
    });

}


module.exports = {
    login,
    googleSignIn,
    renewToken
}
