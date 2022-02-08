const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

/** VISTA USUARIO */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Home-Guest/inicioGuests.html'));
});

app.get('/inicioInvitado', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inicioGuests.html'));
});

/** LOGIN */

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/Login/login.html'));
});

/** SIGN UP */

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/Registro/register.html'));
});

/** HOME */

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + '/views/Home/InicioLogged.html'));
});

/** SERVICIOS */

app.get('/servicios1', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Servicios-Cliente/paquetesServicios-1.html'));
});

app.get('/servicios2', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Servicios-Cliente/paquetesServicios-2.html'));
});

app.get('/reserva', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Servicios-Cliente/popUpReserva.html'));
});

/** CARRITO DE COMPRAS */

app.get('/carritoCompras', (req, res) => {
    res.sendFile(path.join(__dirname, './views/Carrito-Compra/carritoCompras.html'));
});

/** VISTA PROFESOR */

app.get('/inicioProfes', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inicioProfes.html'));
});

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
