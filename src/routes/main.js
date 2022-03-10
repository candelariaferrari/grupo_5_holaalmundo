// ************ Require's ************
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
//const uploadFileEstudiantes = require('../middlewares/multer/multerRegisterEstudiantes');
//const uploadFileProfesores = require('../middlewares/multer/multerRegisterProfesores');
//const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');
//const guestMiddlware = require('../middlewares/guestMiddlware');
const validator = require('../middlewares/express-validator');
const logUserMiddleware = require('../middlewares/userLogs');

/* Inicio */
/*** GET ALL INFO IN HOME GUEST ***/ 
router.get('/', mainController.home);

/*** CREATE USER IN HOME GUEST ***/ 
router.post('/', validator.register, mainController.createUserCarusel);

/*** CREATE COMENTARIO IN HOME GUEST */
router.post('/comment', mainController.createComment);

/*** GET LOGIN VIEW */
router.get('/login', mainController.login);
router.post('/login', logUserMiddleware, validator.login, mainController.userValidation);

/*** GET REGISTER */
router.get('/register', mainController.register);
router.post('/register', validator.register, mainController.createUser);

module.exports = router;