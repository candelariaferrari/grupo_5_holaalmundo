const path = require('path');
const teacherServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const commentService = require("../services/commentService");

let studentsController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

    home: function(req, res) {
        const servicios = packageService.findAllServices();
        //console.log(servicios);
        const profesores = teacherServices.findAllTeachers();
        //console.log(profesores);
        const serviciosRecomendados = packageService.findAllSuggest();
        //console.log(serviciosRecomendados);
        const serviciosMasVendidos = packageService.findAllSold();
        //console.log(serviciosMasVendidos);
        //console.log(req.cookies.userEmail);
        
        res.render('students/homeStudents',{servicios: servicios, 
                                        serviciosRecomendados: serviciosRecomendados,
                                        serviciosMasVendidos: serviciosMasVendidos,
                                        profesores: profesores});
    }, 
    createComment: function(req, res){
        commentService.createComment(req.body);
        res.redirect('/home');
    },
    services: function(req, res) {
        const profesores = profesoresServices.findAllTeachers();
        const serviciosRecomendados = serviciosService.findAllSuggest();
        const serviciosMasVendidos = serviciosService.findAllSold();
        const servicios = serviciosService.findAllServices();
        
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
        return res.redirect('/');
    }
};
module.exports = studentsController;