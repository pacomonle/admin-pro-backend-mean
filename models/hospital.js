const { Schema, model } = require('mongoose');



const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
  
    img: {
        type: String,
    },
    // hacer referencia al userdel modelo de usuario -> Usuario
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
  // renombrar una coleccion
}, {collection: 'hospitales'});


HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    
    return object;
})




module.exports = model( 'Hospital', HospitalSchema );
