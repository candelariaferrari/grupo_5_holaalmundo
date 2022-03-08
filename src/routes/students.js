// ************ Require's ************
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
//const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');

///* CRUD ESTUDIANTES *///

/*** GET ALL INFO IN HOME LOGGED ***/ 
router.get('/home', studentsController.home);

/*** POST COMMENTS ***/ 
router.post('/home', studentsController.createComment);

/*** GET ALL PROFESORES  */
router.get('/packages', studentsController.services);

/*** GET PROFESORES */
router.get('/teachers', studentsController.filterTeachers);

/*** PROFIL PROFESORES */
router.get('/configuracion', studentsController.configuracion);

/*** SHOPPING CART  */
router.get('/shoppingCart', studentsController.shoppingCart);

/*** LOGOUT */
router.get('/logout', studentsController.logout);

module.exports = router;