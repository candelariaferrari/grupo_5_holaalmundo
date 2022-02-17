const path = require('path');

let estudiantesController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/
   /*  login: function(req, res) {
        res.render('Login/login');
    },
    registro: function(req, res) {
        res.render('Registro/register');
    }, */
    homeLogged: function(req, res) {
        res.render('Home/InicioLogged');
    }, 
    servicios: function(req, res) {
        res.render('Servicios-Cliente/paquetesServicios-1');
    },
    filtroProfesores: function(req, res) {
        res.render('Servicios-Cliente/paquetesServicios-2');
    },
    reserva: function(req, res) {
        res.render('Servicios-Cliente/popUpReserva');
    },
    carritoCompras: function(req, res) {
        res.render('Carrito-Compra/carritoCompras');
    }, 
};

module.exports = estudiantesController;