const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

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

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/seteoPerfilProfes.html'));
})

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});






