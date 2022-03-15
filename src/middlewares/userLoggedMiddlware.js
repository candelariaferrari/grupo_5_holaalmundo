const User= require('../services/usersService')

// Middleware de aplicacion
function userLoggedMiddlware(req, res, next) {

    // Son variables que se pueden compartir en todas las vistas
    res.locals.isLogged = false;
    res.locals.loggedStudent = false;
    res.locals.loggedTeacher = false;

    // Email que viene en la cookie
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);
    // console.log("¿Hay usuario con cookie? " + userFromCookie)

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    } 

    // Visualizar barra de navegacion si esta logeado o no
    if(req.session.userLogged){
        if(req.session.userLogged.userRol === '0'){
            res.locals.loggedStudent = true;
        } else {
            res.locals.loggedTeacher = true;
        }
        // Paso lo que tengo en session a una variable local para poder usarlo en todas las vistas
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddlware;