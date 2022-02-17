const path = require('path');

let mainController = {

    homeGuest: function(req, res) {
        res.render('HomeGuest/inicioGuests');
    }, 
};

module.exports = mainController;