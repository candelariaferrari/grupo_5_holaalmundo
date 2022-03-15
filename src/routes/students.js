// ************ Require's ************
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const authMiddlewars = require('../middlewares/authMiddleware');
//const adminMiddlware = require('../middlewares/adminMiddleware');

///* CRUD ESTUDIANTES *///

/*** GET ALL INFO IN HOME LOGGED ***/ 
router.get('/home', authMiddlewars, studentsController.home); //funciona

/*** POST COMMENTS ***/ 
router.post('/home', studentsController.createComment);

/*** GET ALL PROFESORES  */
router.get('/packages', authMiddlewars, studentsController.services); //funciona

/*** GET PROFESORES */
router.get('/teachers', authMiddlewars, studentsController.filterTeachers);

/*** PROFIL PROFESORES */
router.get('/configuration', authMiddlewars, studentsController.configuration); //funciona

/*** SHOPPING CART  */
router.get('/shoppingCart', authMiddlewars, studentsController.shoppingCart); //funciona

/*** LOGOUT */
router.get('/logout', studentsController.logout);

module.exports = router;