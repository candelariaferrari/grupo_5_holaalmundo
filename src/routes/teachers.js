//*** Constantes ***/
const express = require("express")
const router = express.Router()
const teacherController = require("../controllers/teachersController")
const authMiddlewars = require("../middlewares/authMiddleware")
const validator = require("../middlewares/express-validator")

/*** Inicio de profesores ***/
router.get("/home", authMiddlewars, teacherController.home)

/*** Sección de comentarios ***/
router.post("/home", authMiddlewars, teacherController.createComment)

/*** Todos los alumnos ***/
router.get("/students", teacherController.students)

/*** Creación de paquetes ***/
router.get("/packages", teacherController.packages)
router.post("/packages", validator.createPackages, teacherController.processPackages)

/*** Configuración de estudiantes ***/
router.get("/configuration", authMiddlewars, teacherController.configuration)
router.put("/configuration/:id", validator.configurationTeachers, teacherController.configurationProcess)

/*** Clases del día ***/
router.get("/dashboardLessons", teacherController.dashboardLessons)

/*** Cerrar sesión ***/
router.get("/logout", teacherController.logout)

router.get("/students/:id", authMiddlewars, teacherController.detailsStudent)

module.exports = router