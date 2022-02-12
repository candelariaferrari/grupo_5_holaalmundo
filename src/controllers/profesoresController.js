const path = require('path');

let profesoresController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/
    login: function(req, res) {
        res.render('Login/login');
    },
    registro: function(req, res) {
        res.render('Registro/register');
    },
    homeLogged: function(req, res) {
        res.render('Home-Profesores/inicioProfes');
    }, 
    perfil1: function(req, res) {
        res.render('Perfil-Profesor/seteoPerfilProfes-1');
    }, 
    perfil2: function(req, res) {
        res.render('Perfil-Profesor/seteoPerfilProfes-2');
    }, 
    administrar_clases: function(req, res) {
        res.render('Perfil-Profesor/administraClases');
    }, 
};

module.exports = profesoresController;