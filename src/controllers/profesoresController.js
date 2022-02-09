const path = require('path');

let profesoresController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/
    login: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Login/login.html'));
    },
    registro: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Registro/register.html'));
    },
    homeLogged: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Home-Profesores/inicioProfes.html'));
    }, 
    perfil1: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Perfil-Profesor/seteoPerfilProfes-1.html'));
    }, 
    perfil2: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Perfil-Profesor/seteoPerfilProfes-2.html'));
    }, 
    administrar_clases: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Perfil-Profesor/administraClases.html'));
    }, 
};

module.exports = profesoresController;