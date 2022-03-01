// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************

// ************ Handler Image Files Servicios ****************************
const multerDiskStorageServicios = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/servicios'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUploadServicios = multer({storage: multerDiskStorageServicios});