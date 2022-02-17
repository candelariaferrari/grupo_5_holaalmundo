const path = require('path');

let mainController = {

    homeGuest: function(req, res) {
        res.render('HomeGuest/inicioGuests');
    }, 
    login: function(req, res) {
        res.render('Login/login');
    },
    register: function(req, res) {
        res.render('Registro/register');
    },
   
};

module.exports = mainController;


/* ----- REGISTRO ----- */
