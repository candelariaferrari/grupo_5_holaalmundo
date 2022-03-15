const path = require('path');
const teacherServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const commentService = require("../services/commentService");

let studentsController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

    home: function(req, res) {
        
        // ¿Como se pasa el session a local para userlo en todas las vistas?
        // res.locals.userLogged = req.session.userLogged;
        
        const servicios = packageService.findAllServices();
        const profesores = teacherServices.findAllTeachers();
        const serviciosRecomendados = packageService.findAllSuggest();
        const serviciosMasVendidos = packageService.findAllSold();
        
        
        res.render('students/homeStudents', {servicios: servicios, 
                                        serviciosRecomendados: serviciosRecomendados,
                                        serviciosMasVendidos: serviciosMasVendidos,
                                        profesores: profesores, 
                                        user: res.locals.userLogged});
    }, 
    createComment: function(req, res){
        commentService.createComment(req.body);
        res.redirect('/home');
    },
    services: function(req, res) {
        const profesores = teacherServices.findAllTeachers();
        const serviciosRecomendados = packageService.findAllSuggest();
        const serviciosMasVendidos = packageService.findAllSold();
        const servicios = packageService.findAllServices();
        
        res.render('students/packageStudents', {profesores: profesores, 
                                                servicios: servicios,
                                                serviciosRecomendados: serviciosRecomendados,
                                                serviciosMasVendidos:serviciosMasVendidos});
    },
    filterTeachers: function(req, res) {
        res.render('students/viewTeachers');
    },
    configuracion: function(req, res) {       
    },
    reserva: function(req, res) {
        res.render('partials/popUpReserve');
    }, 
    configuration: function(req, res) {

        res.render('students/configurationStudents');
    }, 
    shoppingCart: function(req, res) {
        res.render('shoppingCart/shoppingCart');
    }, 
    logout: function(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};
module.exports = studentsController;