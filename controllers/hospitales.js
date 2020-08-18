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
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarHospital = async(req, res = response ) => {
   
    const id  = req.params.id;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        await Hospital.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}