const express = require('express');
const path = require('path');

const rutasMain = require('./routes/main');

const rutasServicios = require('./routes/servicios');

const app = express();

app.use(express.static('../public'));

app.set('view engine', 'ejs');

/** MODULARIZANDO LAS RUTAS */

app.use('/', rutasMain);


/** SERVIDOR */

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});

