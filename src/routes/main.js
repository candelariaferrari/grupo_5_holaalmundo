const express = require('express');

const router = express.Router();

let mainController = require('../controllers/mainController');

router.get('/', mainController.homeGuest);



module.exports = router;