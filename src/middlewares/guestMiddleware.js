// MIDDLEWARE

function guestMiddleware(req, res, next) 
{
if(req.session.userLogged)
{
 let user = req.session.userLogged.rol_id;
    
 if(user === 1)
 {
  console.log('Entro al middleware en estudiantes'); 
  return  res.redirect('/students/home');
 }
    
 else if (user === 2)
 {
  console.log('Entro al middleware en profesores'); 
  return res.redirect('/teachers/home');
 } 
    
 else 
 {
  return res.redirect('/');
 } 
} 

next();
}

// EXPORTO EL MIDDLEWARE

module.exports = guestMiddleware;
