// ************ Require's ************
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
//const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');

///* CRUD ESTUDIANTES *///

/*** GET ALL INFO IN HOME LOGGED ***/ 
router.get('/home', studentsController.home); //funciona

/*** POST COMMENTS ***/ 
router.post('/home', studentsController.createComment);

/*** GET ALL PROFESORES  */
router.get('/packages', studentsController.services); //funciona

/*** GET PROFESORES */
router.get('/teachers', studentsController.filterTeachers);

/*** PROFIL PROFESORES */
router.get('/configuration', studentsController.configuration); //funciona

/*** SHOPPING CART  */
router.get('/shoppingCart', studentsController.shoppingCart); //funciona

/*** LOGOUT */
router.get('/logout', studentsController.logout);

module.exports = router;