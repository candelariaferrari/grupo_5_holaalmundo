const express = require('express');

const router = express.Router();

let profesoresController = require('../controllers/profesoresController');

router.get('/login', profesoresController.login);
router.get('/registro', profesoresController.registro);
router.get('/logged', profesoresController.homeLogged);
router.get('/perfil1', profesoresController.perfil1);
router.get('/perfil2', profesoresController.perfil2);
router.get('/administrar', profesoresController.administrar_clases);


module.exports = router;