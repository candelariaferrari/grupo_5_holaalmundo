const express = require('express');
const path = require('path');

const rutasMain = require('./src/routes/main.js');
const rutasProfesores = require('./src/routes/profesores.js');
const rutasEstudiantes = require('./src/routes/estudiantes.js');
const rutasServicios = require('./src/routes/servicios.js');

const app = express();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

/** MODULARIZANDO LAS RUTAS */

app.use('/', rutasMain);
app.use('/estudiantes', rutasEstudiantes);
app.use('/profesores', rutasProfesores);

/** SERVIDOR */

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});

