// ************ Require's ************
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const guestMiddlware = require('../middlewares/guestMiddleware');
const validator = require('../middlewares/express-validator');
const logUserMiddleware = require('../middlewares/userLogs');
//const adminMiddlware = require('../middlewares/adminMiddleware');

/*** GET all info in Home Guest ***/ 
router.get('/', guestMiddlware, mainController.home);

/*** POST comment in Home Guest ***/ 
router.post('/comment', mainController.createComment);

/*** Create user with google ***/ 
// TODO 
router.post('/', validator.register, mainController.createUserCarusel);




module.exports = router;