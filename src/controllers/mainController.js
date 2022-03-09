// ************ Require's ************
const userServices = require("../services/usersService");
const profesoresServices = require("../services/teachersService");
const serviciosService = require("../services/packagesService");
const commentService = require("../services/commentService");

let mainController = {

    home: function(req, res) {
        const servicios = serviciosService.findAllServices();
        console.log(servicios);
        const profesores = profesoresServices.findAllTeachers();
        console.log(profesores);
        
        let data = {
			servicios: servicios, 
			profesores: profesores}
        res.render('homeGuest/homeGuest', {data: data});
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
        userServices.createUser(req.body, res);
        res.redirect('/login');
    }
};

module.exports = mainController;
