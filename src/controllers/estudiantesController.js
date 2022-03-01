const path = require('path');
const profesoresServices = require("../services/profesoresService");
const serviciosService = require("../services/serviciosService");
const comentariosService = require("../services/comentariosService");

let estudiantesController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

    homeLogged: function(req, res) {
        const servicios = serviciosService.findAllServices();
        const profesores = profesoresServices.findAllProfesores();
        const serviciosRecomendados = serviciosService.findAllRecomendados();
        const serviciosMasVendidos = serviciosService.findMasVendidos();

        res.render('Home/InicioLogged', {servicios: servicios, 
                                        serviciosRecomendados: serviciosRecomendados,
                                        serviciosMasVendidos: serviciosMasVendidos,
                                        profesores: profesores});
    }, 
    createComment: function(req, res){
        /** PREGUNTAR COMO SE MANEJAN DOS POST EN UNA MISA PAGINA WEB */
        comentariosService.createComment(req.body);
        res.redirect('/inicioAlumnos');
    },
    servicios: function(req, res) {
        const profesores = profesoresServices.findAllProfesores();
        const serviciosRecomendados = serviciosService.findAllRecomendados();
        const serviciosMasVendidos = serviciosService.findMasVendidos();
        const servicios = serviciosService.findAllServices();
    
        res.render('Servicios-Cliente/paquetesServicios-1', {profesores: profesores, 
                                                            servicios: servicios,
                                                            serviciosRecomendados: serviciosRecomendados,
                                                            serviciosMasVendidos:serviciosMasVendidos});
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