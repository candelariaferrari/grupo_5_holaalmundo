// ************ Require's ************
const userServices = require("../services/usersService");
const profesoresServices = require("../services/teachersService");
const serviciosService = require("../services/packagesService");
const commentService = require("../services/commentService");

let mainController = {

    home: function(req, res) {
        const servicios = serviciosService.findAllServices();
        const profesores = profesoresServices.findAllTeachers();
        
        let data = {
			servicios: servicios, 
			profesores: profesores}
        res.render('homeGuest/homeGuest', {data: data});
    },
    createUserCarusel: function(req, res) {
        userServices.createUserCarusel(req, res);
        // res.redirect('/login');
    },
    createComment: function(req, res){
        commentService.createComment(req);
        res.redirect('/');
    },
    login: function(req, res) {
        res.render('login/login');
    },
    userValidation: function(req, res) {
        userServices.findByEmail(req, res);
    },
    register: function(req, res) {
        res.render('register/register');
    },
    createUser: function(req, res){
        userServices.createUser(req, res);
        res.redirect('/login');
    }
};

module.exports = mainController;
