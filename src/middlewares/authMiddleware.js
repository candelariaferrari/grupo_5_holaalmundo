function authMiddlware(req, res, next) {

    if(!req.session.userLogged){
        return res.redirect("/users/login");
    } 
    return next();
}

module.exports = authMiddlware;