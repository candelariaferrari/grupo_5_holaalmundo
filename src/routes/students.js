// ************ Require's ************
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const authMiddlewars = require('../middlewares/authMiddleware');
const validator = require('../middlewares/express-validator');
//const adminMiddlware = require('../middlewares/adminMiddleware');

/*** GET all info in Home Students ***/ 
router.get('/home', authMiddlewars, studentsController.home);

/*** POST COMMENTS ***/ 
router.post('/home', authMiddlewars, studentsController.createComment);

/*** GET PROFESORES */
router.get('/teachers', authMiddlewars, studentsController.filterTeachers);  // authMiddlewars, 

/*** GET ALL PROFESORES  */
router.get('/packages', authMiddlewars, studentsController.services); // authMiddlewars

/*** PROFIL PROFESORES */
router.get('/configuration', authMiddlewars, studentsController.configuration); 
router.post('/configuration', validator.configurationStudents, studentsController.configurationProcess)

/*** SHOPPING CART  */
router.get('/shoppingCart', authMiddlewars, studentsController.shoppingCart); 

/*** DETAILS TEACHER  */
router.get('/detailsTeacher', authMiddlewars, studentsController.detailsTeacher); 

/*** LOGOUT */
router.get('/logout', studentsController.logout);

module.exports = router;

