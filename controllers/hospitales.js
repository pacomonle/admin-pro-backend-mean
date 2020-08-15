// para poder ver las ayudas de las resp.
const { response } = require('express');

// modelo de hospital importado
const Hospital = require('../models/hospital');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre email img')

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async(req, res = response) => {

   // console.log(req.body)

   // extraer eluid del usuario del TOKEN - JWT
   // el middleware devuelve el req.uid y el req.role
     const uid = req.uid

    // const { nombre } = req.body;
    const hospital = new Hospital( {
       usuario: uid,
        ...req.body
    } );
    try {
        // Guardar hospital
      const hospitalDB = await hospital.save();
     
        res.json({
            ok: true,
            hospital: hospitalDB,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        });
    }

  
  
}


const actualizarHospital = async (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
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


const borrarHospital = async(req, res = response ) => {
   
    res.json({
        ok: true,
        msg: 'borrarHospitales'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}