function guestMiddlware(req, res, next) {
    // Para que no se pueda ir al login y register desde la vista home students o teachers

    if(req.session.userLogged){
        console.log("Entro en el middlewar de guest");
        console.log(req.session.userLogged.userRol);
        let variable = req.session.userToLogin.userRol;
        console.log(typeof variable);
        if(req.session.userToLogin.userRol == "0"){
           console.log("Entro en estudiantes"); 
           return  res.redirect('/students/home');
        } else if (req.session.userToLogin.userRol == "1") {
           console.log("Entro en profesores"); 
           return res.redirect('/teachers/home');
        }
    } else {
        return res.redirect('/');
    }

    next();
}

module.exports = guestMiddlware;