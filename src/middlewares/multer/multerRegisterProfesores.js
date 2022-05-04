// CONSTANTES

const multer = require('multer');
const path = require('path');

// MULTER 

const storage = multer.diskStorage({
      destination: function(req, file, cb) 
      {
       cb(null, path.join(__dirname, '../../public/images/teachers'));
      },
      filename: function(req, file, cb) 
      {
       const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
       cb(null, newFileName);
      }});

const upload = multer({
      storage: storage, 
      fileFilter: function(req, file, cb)
      {
       const imagenesValidas = [".jpg", "jpeg", ".png", ".PNG", ".JPG", ".JPEG"];
       const extension = path.extname(file.originalname);
       const resultado = imagenesValidas.includes(extension);
          
       if(resultado == false)
       {
        req.file = file;
       }
          
       cb(null, resultado);
      }});

// EXPORTO EL MODULO

module.exports = upload;
