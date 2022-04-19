// ************ Require's ************
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
//const uploadFileEstudiantes = require('../middlewares/multer/multerRegisterEstudiantes');
//const uploadFileProfesores = require('../middlewares/multer/multerRegisterProfesores');
//const adminMiddlware = require('../middlewares/adminMiddleware');
const guestMiddlware = require('../middlewares/guestMiddlware');
const validator = require('../middlewares/express-validator');
const logUserMiddleware = require('../middlewares/userLogs');

/* Inicio */
/*** GET ALL INFO IN HOME GUEST ***/ 
router.get('/', guestMiddlware, mainController.home);

/*** CREATE USER IN HOME GUEST ***/ 
router.post('/', validator.register, mainController.createUserCarusel);

/*** CREATE COMENTARIO IN HOME GUEST */
router.post('/comment', mainController.createComment);

/*** GET LOGIN VIEW */
router.get('/login', guestMiddlware, mainController.login);
router.post('/login', logUserMiddleware, validator.login, mainController.userValidation);

/*** GET REGISTER */
router.get('/register', guestMiddlware, mainController.register);
router.post('/register', validator.register, mainController.createUser);

module.exports = router;