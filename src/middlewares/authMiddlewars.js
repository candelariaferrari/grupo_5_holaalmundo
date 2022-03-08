function guestMiddlware(req, res, next) {

    if(!req.session.userLogged){
        // Revisar porque son dos tipos de usuarios para hacer la redireccion
        return res.redirect('/')
    }
    next();
}

module.exports = guestMiddlware;