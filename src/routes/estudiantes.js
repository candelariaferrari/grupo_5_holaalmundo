const express = require('express');

const router = express.Router();

let estudiantesController = require('../controllers/estudiantesController');

router.get('/login', estudiantesController.login);
router.get('/registro', estudiantesController.registro);
router.get('/logged', estudiantesController.homeLogged);
router.get('/servicios', estudiantesController.servicios);
router.get('/filtro-profesores', estudiantesController.filtroProfesores);
router.get('/reserva', estudiantesController.reserva);
router.get('/carritoCompras', estudiantesController.carritoCompras);

module.exports = router;