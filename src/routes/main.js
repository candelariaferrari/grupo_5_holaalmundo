// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Handler Image Files Home Guest ****************************
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/clients'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUpload = multer({storage: multerDiskStorage});

/* Inicio */
/*** GET ALL INFO IN HOME GUEST ***/ 
router.get('/', mainController.list);

/*** CREATE USER IN HOME GUEST ***/ 
router.post('/', mainController.createUser);

/*** CREATE COMENTARIO IN HOME GUEST */
router.post('/comment', mainController.createComment);

/*** GET LOGIN VIEW */
router.get('/login', mainController.login);

router.post('/login', mainController.userValidation);

/*** GET REGISTER */
router.get('/register', mainController.register);

/*** CREATE USER */
router.post('/register', mainController.createUser);

module.exports = router;