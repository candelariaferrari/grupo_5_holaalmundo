const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get('/paquetes', (req, res) => {
    res.sendFile(path.join(__dirname, './views/detailView.html'));
});

app.get('/inicioInvitado', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inicioGuests.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
});

app.get('/iniciarSesion', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

app.get('/carritoDeCompras', (req, res) => {
    res.sendFile(path.join(__dirname, './views/cart.html'));
});

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});
