// ************ Require's ************
const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/estudiantesController');
//const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');


///* CRUD ESTUDIANTES *///

/*** GET ALL INFO IN HOME LOGGED ***/ 
router.get('/inicioAlumnos', alumnosController.homeLogged);

/*** POST COMMENTS ***/ 
router.post('/inicioAlumnos', alumnosController.createComment);

/*** GET ALL PROFESORES  */
router.get('/inicioAlumnos/paquetes', alumnosController.servicios);

/*** GET PROFESORES */
router.get('/inicioAlumnos/profesores', alumnosController.filtroProfesores);

/* * * ESTE NO DEBERIA IR PORQUE PASO A SER UN MODAL
router.get('/inicioAlumnos/reserva', alumnosController.reserva); */

router.get('/inicioAlumnos/configuracion', alumnosController.configuracion);

router.get('/inicioAlumnos/carrito', alumnosController.carritoCompras);

router.get('/inicioAlumnos/logout', alumnosController.logout);


module.exports = router;