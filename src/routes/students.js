// CONSTANTES

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const authMiddleware = require('../middlewares/authMiddleware');
//const adminMiddleware = require('../middlewares/adminMiddleware');

// RUTAS 

// INICIO DE ESTUDIANTES
router.get('/home', authMiddleware, studentsController.home); 

// CREAR UN COMENTARIO EN EL INICIO DE ESTUDIANTES
router.post('/home', studentsController.createComment);

// OBTENER TODOS LOS PAQUETES PARA LOS ESTUDIANTES
router.get('/packages', authMiddleware, studentsController.services); 

// OBTENER TODOS LOS PROFESORES PARA LOS ESTUDIANTES
router.get('/teachers', authMiddleware, studentsController.filterTeachers);

// CONFIGURACIONES DEL PERFIL DE LOS ESTUDIANTES
router.get('/configuration', authMiddleware, studentsController.configuration); 

// CARRITO DE COMPRAS DE LOS ESTUDIANTES
router.get('/shoppingCart', authMiddleware, studentsController.shoppingCart); 

// CERRAR SESIÓN DEL ESTUDIANTE 
router.get('/logout', studentsController.logout);

// EXPORTAR EL MODULO 

module.exports = router;
