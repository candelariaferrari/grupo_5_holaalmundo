//*** Constantes ***/
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const validator = require("../middlewares/express-validator")
const teacherController = require("../controllers/teachersController")
const authMiddlewars = require("../middlewares/authMiddleware")
   
/*** Inicio de profesores ***/
router.get("/home", authMiddlewars, teacherController.home)

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

module.exports = router

