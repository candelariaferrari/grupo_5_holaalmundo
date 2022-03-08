// ************ Require's ************
const userServices = require("../services/usersService");
const profesoresServices = require("../services/profesoresService");
const serviciosService = require("../services/serviciosService");
const comentariosService = require("../services/comentariosService");

let mainController = {

    list: function(req, res) {
        const servicios = serviciosService.findAllServices();
        const profesores = profesoresServices.findAllProfesores();
        
        let data = {
			servicios: servicios, 
			profesores: profesores}

        res.render('HomeGuest/inicioGuests', {data: data});
    }, 
    createUser: function(req, res){
        // Se debe revisar ya que hay dos formularios con diferentes campos un en la ruta root y otro en la ruta /register
        userServices.createUser(req.body, res);
        res.redirect('/login');
    },
    createComment: function(req, res){
        /** PREGUNTAR COMO SE MANEJAN DOS POST EN UNA MISA PAGINA WEB */
        comentariosService.createComment(req.body);
        res.redirect('/');
    },
    login: function(req, res) {
        res.render('Login/login');
    },
    userValidation: function(req, res) {
        // Codificar el password
        userServices.findByEmail(req, res);

    },
    register: function(req, res) {
        res.render('Registro/register');
    },
    createRegister: function(req, res) {
        // Se debe revisar y ajustar los campos del forumario puesto que pierden su enfoque
        userServices.createUser(req, res);
        res.redirect('/login');
    }, 

};

module.exports = mainController;
