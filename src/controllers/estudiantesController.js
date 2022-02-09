const path = require('path');

let estudiantesController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/
    login: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Login/login.html'));
    },
    registro: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Registro/register.html'));
    },
    homeLogged: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Home/InicioLogged.html'));
    }, 
    servicios: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Servicios-Cliente/paquetesServicios-1.html'));
    },
    filtroProfesores: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Servicios-Cliente/paquetesServicios-2.html'));
    },
    reserva: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Servicios-Cliente/popUpReserva.html'));
    },
    carritoCompras: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Carrito-Compra/carritoCompras.html'));
    }, 
};

module.exports = estudiantesController;