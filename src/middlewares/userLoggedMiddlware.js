const User= require('../services/usersService')

function userLoggedMiddlware(req, res, next) {

    res.locals.isLogged = false;

    // Condicional de en las vistas 
    /*if(req.session.userLogged){
        res.locals.isLogged = true;
        Paso lo que tengo en session a una variable local
        res.locals.userLogged= req.session.userLogged;
    }*/

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged= true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddlware;