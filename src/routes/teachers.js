// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/express-validator');
// ************ Controller Require ************
const teacherController = require('../controllers/teachersController');
const authMiddlewars = require('../middlewares/authMiddleware');

/* Profes */
router.get('/home', authMiddlewars, teacherController.home); //funciona
router.get('/students', teacherController.students); //funciona
router.get('/packages',teacherController.packages); //funcona
router.post('/packages', validator.createPackages,teacherController.processPackages);
router.get('/configuration', teacherController.configuration); //funciona
router.get('/dashboardLessons', teacherController.dashboardLessons);//funciona
/*** LOGOUT */
router.get('/logout', teacherController.logout);

module.exports = router;