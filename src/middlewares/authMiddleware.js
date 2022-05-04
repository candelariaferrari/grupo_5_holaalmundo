// MIDDLEWARE

function authMiddleware(req, res, next) 
{
if(!req.session.userLogged)
{
 return res.redirect('/')
} 

next();
}

// EXPORTO EL MIDDLEWARE

module.exports = authMiddleware;
