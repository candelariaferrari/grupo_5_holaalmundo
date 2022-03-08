// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const teacherController = require('../controllers/teachersController');

/* Profes */
router.get('/home', teacherController.home);
router.get('/students', teacherController.students);
router.get('/packages', teacherController.packages);
router.get('/configuration', teacherController.configuration);
router.get('/dashboardLessons', teacherController.dashboardLessons);


module.exports = router;