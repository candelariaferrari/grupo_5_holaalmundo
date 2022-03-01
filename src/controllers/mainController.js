// ************ Require's ************
const req = require("express/lib/request");
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
        userServices.createUser(req.body);
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
        let userEncontrado = userServices.findByEmail(req.body.email, req.body.contrasenia);
        /** Se debera crear una vista de admin para hacer el CRUD de los servicios */
        /** Creo que el post, put y delete de los servicios se puede crear desde la vista de los profesores */
        //let usuarioAdmin = serviceRegister.findAllUsers()
        
        //if(usuarioAdmin.admin == true){
        //    res.redirect('/admin');
        //} 

        if(userEncontrado.userRol == "estudiante"){
            res.redirect('/estudiantes/inicioAlumnos');
        } else {
            res.redirect('/profesores/inicioProfesores');
        } 
    },
    register: function(req, res) {
        res.render('Registro/register');
    },
    createRegister: function(req, res) {
        // Se debe revisar y ajustar los campos del forumario puesto que pierden su enfoque
        userServices.createRegister(req.body);
        res.redirect('/login');
    }, 

};

module.exports = mainController;
