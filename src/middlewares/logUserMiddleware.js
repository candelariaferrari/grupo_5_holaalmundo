// CONSTANTES

const fs = require('fs');
const path = require('path');
const pathLog = path.join(__dirname, '../logs/userLogs.txt');

// MIDDLEWARE

function logUserMiddleware(req, res, next) 
{
fs.appendFileSync(pathLog, 'El usuario ingresó a la ruta: ' + req.url + '\n');
    
next();
}

// EXPORTO EL MIDDLEWARE

module.exports = logUserMiddleware;
