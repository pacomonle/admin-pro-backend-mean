// para poder ver las ayudas de las resp.
const { response } = require('express');
// importar todos los modelos para realizar la busqueda
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico= require('../models/medico');


const getTodo = async(req, res = response) => {

// console.log(req.params)
const busqueda = req.params.busqueda
// crear expresion regular para la busqueda
const regex = new RegExp(busqueda, 'i') // la i es para hacerlo insensible

const [usuarios, hospitales, medicos] = await Promise.all([
                                                Usuario.find({nombre: regex}),
                                                Hospital.find({nombre: regex}),
                                                Medico.find({nombre: regex})

                                            ])

res.json({
    ok: true,
    usuarios,
    hospitales,
    medicos,
    busqueda
})


}

const getDocumentosColeccion = async(req, res = response) => {

    // console.log(req.params)
    const busqueda = req.params.busqueda
    const tabla = req.params.tabla
    // crear expresion regular para la busqueda
    const regex = new RegExp(busqueda, 'i') // la i es para hacerlo insensible
    let data = []
    switch (tabla) {
        case 'usuarios':
            
            data = await Usuario.find({nombre: regex})
            break
        case 'hospitales':
            
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre email img')  
            break
        case 'medicos':
            
             data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre email img')  
                                .populate('hospital', 'nombre')
             break
        default:
           return  res.status(400).json({
                                        ok:false,
                                        msg:'la tabla debe ser usario/medicos/hospitales'
                                    })
    }
    
   res.json({
        ok: true,
        resultados: data,
        busqueda
      })
    
    }

module.exports = {
    getTodo,
    getDocumentosColeccion
    
}