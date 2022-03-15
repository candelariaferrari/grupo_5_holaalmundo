const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/teachers'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({
    storage: storage, 
    fileFilter: function(req, file, cb){
        const imagenesValidas = [".jpg", "jpeg", ".png", ".PNG", ".JPG", ".JPEG"];
        const extencion = path.extname(file.originalname);
        const resultado = imagenesValidas.includes(extencion);
        if(resultado == false){
            req.file = file;
        }
        cb(null, resultado);
    }
});

module.exports = upload;