const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

/** VISTA USUARIO */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/inicioGuests.html'));
});

/** LOGIN */

app.get('/inicioInvitado', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inicioGuests.html'));
});

app.get('/iniciarSesion', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

/** SIGN UP */

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
});

/** HOME */

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

/** SERVICIOS */

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/paquetesServicios.html'));
});

app.get('/reserva', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/popUpReserva.html'));
});

/** CARRITO DE COMPRAS */

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
