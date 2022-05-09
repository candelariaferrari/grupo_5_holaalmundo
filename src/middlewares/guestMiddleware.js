// ************ Require's liberies ************
// Este Middleware sirve para determinar si el usuario tiene una session activa 
// para hacer la redireccion automatica

function guestMiddlware(req, res, next) {
    
    if(req.session.userLogged){

        let user = req.session.userLogged.user_rol_fk;
    
        if(user === 1){
           return  res.redirect('/students/home');
        } else if (user === 2){
           return res.redirect('/teachers/home');
        } else {
            return res.redirect('/');
        } 
    } else {
        return next();
    } 
}

module.exports = guestMiddlware;