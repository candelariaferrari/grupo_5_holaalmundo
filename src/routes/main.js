// CONSTANTES

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validator = require('../middlewares/express-validator');
const logUserMiddleware = require('../middlewares/logUserMiddleware');
//const uploadFileEstudiantes = require('../middlewares/multer/multerRegisterEstudiantes');
//const uploadFileProfesores = require('../middlewares/multer/multerRegisterProfesores');
//const adminMiddlware = require('../middlewares/adminMiddleware');

// RUTAS 

// INICIO DE INVITADOS 
router.get('/', guestMiddleware, mainController.home);

// CREAR USUARIO EN EL INICIO DE INVITADOS 
router.post('/', validator.register, mainController.createUserCarusel);

// ESCRIBIR UN COMENTARIO EN EL INICIO DE INVITADOS 
router.post('/comment', mainController.createComment);

// INICIO DE SESION Y SUS VALIDACIONES
router.get('/login', guestMiddleware, mainController.login);
router.post('/login', logUserMiddleware, validator.login, mainController.userValidation);

// REGISTRO Y SUS VALIDACIONES
router.get('/register', guestMiddleware, mainController.register);
router.post('/register', validator.register, mainController.createUser);

// EXPORTAR EL MODULO 

module.exports = router;
