// ************ Require's ************
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const uploadFileEstudiantes = require('../middlewares/multer/multerRegisterEstudiantes');
const uploadFileProfesores = require('../middlewares/multer/multerRegisterProfesores');
//const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');
const validator = require('../middlewares/express-validator');
const logUserMiddleware = require('../middlewares/userLogs');

/* Inicio */
/*** GET ALL INFO IN HOME GUEST ***/ 
router.get('/', mainController.list);

/*** CREATE USER IN HOME GUEST ***/ 
// revisar los campos del formulario
router.post('/', mainController.createUser);

/*** CREATE COMENTARIO IN HOME GUEST */
router.post('/comment', mainController.createComment);

/*** GET LOGIN VIEW */
router.get('/login', mainController.login);

router.post('/login', logUserMiddleware, validator.login, mainController.userValidation);

/*** GET REGISTER */
router.get('/register', mainController.register);

/*** CREATE USER */
router.post('/register', validator.register, mainController.createRegister);

module.exports = router;