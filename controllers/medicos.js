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
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const borrarMedico = async(req, res = response ) => {
   
    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img');
    
        res.json({
            ok: true,
            medico
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}