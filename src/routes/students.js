//*** Constantes ***/
const express = require("express")
const router = express.Router()
const studentsController = require("../controllers/studentsController")
const authMiddlewars = require("../middlewares/authMiddleware")
const validator = require("../middlewares/express-validator")
   
/*** Inicio de estudiantes ***/
router.get("/home", authMiddlewars, studentsController.home)

/*** Sección de comentarios ***/
router.post("/home", authMiddlewars, studentsController.createComment)
 
/*** Todos los profesores ***/
router.get("/teachers", authMiddlewars, studentsController.filterTeachers)

/*** Todos los paquetes ***/
router.get("/packages", authMiddlewars, studentsController.services)

/*** Configuración de estudiantes ***/
router.get("/configuration", authMiddlewars, studentsController.configuration)
router.put("/configuration/:id", validator.configurationStudents, studentsController.configurationProcess)

/*** Cerrar sesión ***/
router.get("/logout", studentsController.logout)

/*** Detalles de los profesores ***/
router.get("/teachers/:id", authMiddlewars, studentsController.detailsTeacher)

module.exports = router
