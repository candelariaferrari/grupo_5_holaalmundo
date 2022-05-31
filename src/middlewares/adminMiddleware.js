module.exports = (req, res, next) => {
    if (typeof req.session.userLogged != "undefined"){
         if(req.session.userLogged.admin == 1){
             return next()
         }
     }
     return res.redirect("/")
 }