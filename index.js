// importar dotenv
require('dotenv').config();

const path = require('path');

// importar express
const express = require('express');
// deshabilitar cors
const cors = require('cors');
// importar conexion databse - config.js
const { dbConnection } = require('./database/config');

// MIDDLEWARES

// crear servidor express
const app = express();
// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );



// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );

// Lo último
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

// levantar servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});