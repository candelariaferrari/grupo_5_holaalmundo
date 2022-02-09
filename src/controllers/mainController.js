const path = require('path');

let mainController = {

    homeGuest: function(req, res) {
        res.sendFile(path.join(__dirname, '../views/Home-Guest/InicioGuests.html'));
    }, 
};

module.exports = mainController;