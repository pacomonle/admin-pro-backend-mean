const { Schema, model } = require('mongoose');



const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
  
    img: {
        type: String,
    },
    //  hacer referencia al userdel modelo de usuario -> Usuario
    // saber que usuario lo creo
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
     // hacer referencia al userdel modelo de hospital -> Hospital
     // saber que usuario lo creo
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
  
});


MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    
    return object;
})




module.exports = model( 'Medico', MedicoSchema );
