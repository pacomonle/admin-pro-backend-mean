// importar dotenv
require('dotenv').config();
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

// Base de datos
dbConnection();


// rutas

app.get('/', (req, res) => {
   res.json({
       ok:true,
       msg: 'Hey!!!'
   })
})



// levantar servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});