// CONSTANTES

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const teacherController = require('../controllers/teachersController');
const authMiddleware = require('../middlewares/authMiddleware');

// RUTAS 

// INICIO DE PROFESORES
router.get('/home', authMiddleware, teacherController.home); 

// OBTENER TODOS LOS ESTUDIANTES PARA LOS PROFESORES
router.get('/students', teacherController.students); 

// OBTENER TODOS LOS PAQUETES DE LOS PROFESORES
router.get('/packages', teacherController.packages); 

// CONFIGURACIONES DEL PERFIL DE LOS PROFESORES
router.get('/configuration', teacherController.configuration); 

// CLASES DE LOS PROFESORES
router.get('/dashboardLessons', teacherController.dashboardLessons);

// CERRAR SESIÓN DEL PROFESOR 
router.get('/logout', teacherController.logout);

// EXPORTAR EL MODULO 

module.exports = router;
