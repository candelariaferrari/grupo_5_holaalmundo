// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const alumnosController = require('../controllers/estudiantesController');

// ************ Handler Image Files Clientes ****************************
const multerDiskStorageClientes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/clients'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUploadClientes = multer({storage: multerDiskStorageClientes});

/* Alumnos */
/*** GET ALL INFO IN HOME LOGGED ***/ 
router.get('/inicioAlumnos', alumnosController.homeLogged);

/*** POST COMMENTS ***/ 
router.post('/inicioAlumnos', alumnosController.createComment);

/*** GET ALL PROFESORES  */
router.get('/inicioAlumnos/paquetes', alumnosController.servicios);

/*** GET PROFESORES */
router.get('/inicioAlumnos/profesores', alumnosController.filtroProfesores);

router.get('/inicioAlumnos/reserva', alumnosController.reserva);


router.get('/inicioAlumnos/carrito', alumnosController.carritoCompras);


module.exports = router;