// ************ Require's ************
const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");
const authMiddlewars = require("../middlewares/authMiddleware");
const validator = require("../middlewares/express-validator");
const upload = require('../middlewares/multer/multerRegister');

//const adminMiddlware = require('../middlewares/adminMiddleware');

/*** GET all info in Home Students ***/
router.get("/home", authMiddlewars, studentsController.home);

/*** POST COMMENTS ***/
router.post("/home", authMiddlewars, studentsController.createComment);

/*** GET PROFESORES */
router.get("/teachers", authMiddlewars, studentsController.filterTeachers); // authMiddlewars,

/*** GET ALL PROFESORES  */
router.get("/packages", authMiddlewars, studentsController.services); // authMiddlewars

/*** PROFIL PROFESORES */

router.get("/configuration", authMiddlewars, studentsController.configuration);

router.post(
  "/configuration",
  upload.any(),
  validator.configurationStudents,
  studentsController.configurationProcess
);

/*** LOGOUT */
router.get("/logout", studentsController.logout);

/*** DETAILS TEACHER  */
router.get("/teachers/:id", authMiddlewars, studentsController.detailsTeacher);

module.exports = router;
