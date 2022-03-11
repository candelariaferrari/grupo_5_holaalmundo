const User= require('../services/usersService')

function userLoggedMiddlware(req, res, next) {

    // Son variables que se pueden compartir en todas las vistas
    res.locals.isLogged = false;

    // Email que viene en la cookie
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    console.log("¿Hay usuario con cookie? " + userFromCookie)

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    // Visualizar barra de navegacion si esta logeado o no
    if(req.session.userLogged){
        res.locals.isLogged = true;
        // Paso lo que tengo en session a una variable local para poder usarlo en todas las vistas
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddlware;