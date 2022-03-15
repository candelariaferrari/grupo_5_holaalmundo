function guestMiddlware(req, res, next) {
    // Para que no se pueda ir al login y register desde la vista home students o teachers

    if(req.session.userLogged){

        let user = req.session.userLogged.userRol;

        if(user === "0"){
           console.log("Entro en estudiantes"); 
           return  res.redirect('/students/home');
        } else if (user === "1"){
           console.log("Entro en profesores"); 
           return res.redirect('/teachers/home');
        } else {
            return res.redirect('/');
        } 
    } 

    next();
}

module.exports = guestMiddlware;