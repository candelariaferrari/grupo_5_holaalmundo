const path = require('path');


let profesoresController = {

    /**  Aqui van los metodos que se encargan de manejar a los profesores*/
   
    login: function (req, res) {
        res.render('Login/login');
    },
    registro: function (req, res) {
        res.render('Registro/register');
    },
    homeLogged: function (req, res) {
        /** Llamar al servicio */
        res.render('Home-Profesores/inicioProfes');
    },
    perfil1: function (req, res) {
        res.render('Perfil-Profesor/seteoPerfilProfes-1');
    },
    perfil2: function (req, res) {
        res.render('Perfil-Profesor/seteoPerfilProfes-2');
    },
    administrarClases: function (req, res) {
        res.render('Perfil-Profesor/administraClases');
    },
};

module.exports = profesoresController;