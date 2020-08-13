// para poder ver las ayudas de las resp.
const { response } = require('express');
// libreria encriptar contraseña
const bcrypt = require('bcryptjs');
// modelo de usuario importado
const Usuario = require('../models/usuario');
// generar token con libreria jwt
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        // viene del token
       // uid: req.uid
    });

}

const crearUsuario = async(req, res = response) => {
    console.log(req.body)
    const { email, password } = req.body;
    

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await usuario.save();
       // console.log(usuario)
        // Generar el TOKEN - JWT
       const token = await generarJWT( usuario._id, usuario.role );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


  
}


const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
            //console.log(req.body)
            //console.log(usuarioDB)
        const { password, google, email, ...campos } = req.body;
            //console.log(campos)
            // delete req.body.password
            // delete req.body.google
        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async(req, res = response ) => {
 // recuperar id de los params
    const uid = req.params.id;

    try {
       // comprobar que es id corresponde a un usuarioDB
        const usuarioDB = await Usuario.findById( uid );
       // si no existe usuaioDB controlar error - 400 bad request
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
       // en caso contrario borraro de la data base
        await Usuario.findByIdAndDelete( uid );

      // devolver las res
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    
    } catch (error) {
       // controlar el erro del servidor - 500 
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}