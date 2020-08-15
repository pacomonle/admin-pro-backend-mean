// para poder ver las ayudas de las resp.
const { response } = require('express');

// modelo de hospital importado
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre role email img')
                                .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async(req, res = response) => {

  // console.log(req.body)
  // extraer eluid del usuario del TOKEN - JWT
   // el middleware devuelve el req.uid y el req.role
   const uid = req.uid
   const { hospital, nombre } = req.body

  try {
    const medico = new Medico( {
        usuario: uid,
        hospital,
        nombre
    } );
        // Guardar medico
     const medicoDB = await medico.save();

     res.json({
        ok: true,
        medico: medicoDB
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error inesperado... habla con el administrador'
    });
  }
   
}


const actualizarMedico = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
  
/*
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
*/
}


const borrarMedico = async(req, res = response ) => {
   
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });


/*

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

*/
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}