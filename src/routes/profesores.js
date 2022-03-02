// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const profesController = require('../controllers/profesoresController');

// ************ Handler Image Files Profesores ****************************
const multerDiskStorageProfesores = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/profesores'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUploadProfesores = multer({storage: multerDiskStorageProfesores});

/* Profes */
router.get('/inicioProfesores', profesController.homeLogged);
router.get('/inicioProfesores/misAlumnos', profesController.misAlumnos);
router.get('/inicioProfesores/perfil1', profesController.perfil1);
router.get('/inicioProfesores/perfil2', profesController.perfil2);
router.get('/inicioProfesores/administrarClases', profesController.administrarClases);


module.exports = router;