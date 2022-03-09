// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const teacherController = require('../controllers/teachersController');

/* Profes */
router.get('/home', teacherController.home); //funciona
router.get('/students', teacherController.students); //funciona
router.get('/packages', teacherController.packages); //funcona
router.get('/configuration', teacherController.configuration); //funciona
router.get('/dashboardLessons', teacherController.dashboardLessons);//funciona


module.exports = router;