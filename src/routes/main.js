const express = require('express');
const router = express.Router();


let mainController = require('../controllers/mainController');
let profesController = require('../controllers/profesoresController');
let alumnosController = require('../controllers/estudiantesController');
/* Inicio */
router.get('/', mainController.homeGuest);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
/* Profes */
router.get('/inicioProfesores', profesController.homeLogged);
router.get('/inicioProfesores/perfil1', profesController.perfil1);
router.get('/inicioProfesores/perfil2', profesController.perfil2);
router.get('/inicioProfesores/administrarClases', profesController.administrarClases);
/* Alumnos */
router.get('/inicioAlumnos', alumnosController.homeLogged);
router.get('/inicioAlumnos/paquetes', alumnosController.servicios);
router.get('/inicioAlumnos/profesores', alumnosController.filtroProfesores);
router.get('/inicioAlumnos/reserva', alumnosController.reserva);
router.get('/inicioAlumnos/carrito', alumnosController.carritoCompras);
module.exports = router;