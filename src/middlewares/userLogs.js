const fs = require('fs');
const path = require('path');
const pathLog = path.join(__dirname, '../logs/userLogs.txt');


function logUserMiddleware(req, res, next) {
    fs.appendFileSync(pathLog, 'El usuario ingresó a la ruta: ' + req.url + "\n");
    next();
}

module.exports = logUserMiddleware;