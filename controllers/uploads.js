const path = require('path');
const fs = require('fs');

const { response } = require('express');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = async( req, res = response ) => {
    // recoger los params
    const tipo = req.params.tipo;
    const id   = req.params.id;
    // Validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }
     // Validar que exista un archivo
     if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
      // Procesar la imagen...
      const file = req.files.imagen;
      console.log(file)
      const nombreCortado = file.name.split('.'); // 20170426_100619.1.3.jpg
      const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
       // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

      // Generar el nombre del archivo que es string -UNICO -libreria uuid
      const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

       // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

     // Mover la imagen - ver documentacion libreria file-upload
     // const file = req.files.imagen;
     file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }


    // Actualizar base de datos
   actualizarImagen( tipo, id, nombreArchivo );

            res.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
     });
}

const retornaImagen = ( req, res = response ) => {
// recuperar los paramas
  const tipo = req.params.tipo;
     //console.log(tipo)
  const foto = req.params.foto;
    //console.log(foto)
// path de la imagen a retornar - libreria path de node
  const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    // enviar una imagen por defecto si no existe - usar libreria file system de node
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }
  
}



module.exports = {
    fileUpload,
    retornaImagen
}