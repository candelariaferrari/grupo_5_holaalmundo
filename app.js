const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

/** VISTA USUARIO */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/inicioGuests.html'));
});

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/paquetesServicios.html'));
});

app.get('/reserva', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/popUpReserva.html'));
});

app.get('/carritoCompras', (req, res) => {
    res.sendFile(path.join(__dirname, './views/carritoCompras.html'));
});

/** VISTA PROFESOR */

app.get('/perfilProfesores1', (req, res) => {
    res.sendFile(path.join(__dirname, './views/seteoPerfilProfes-1.html'));
});

app.get('/perfilProfesores2', (req, res) => {
    res.sendFile(path.join(__dirname, './views/seteoPerfilProfes-2.html'));
});

/** SERVIDOR */

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});
