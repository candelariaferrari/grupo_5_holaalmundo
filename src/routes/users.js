var express = require('express');
var router = express.Router();
const usersController= require("../controllers/usersController");
const validator = require('../middlewares/express-validator');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const userMulterConfig = require("../middlewares/multer/multerRegister");

/* GET & POST users listing */
router.get('/login', guestMiddleware, usersController.login);
router.post("/login", validator.login, usersController.processLogin);

/* GET & POST users profile */
router.get("/register", guestMiddleware ,usersController.register);
router.post("/register", userMulterConfig.single("avatar"), validator.register, usersController.processRegister);

/* POST users logout */
router.post("/logout", usersController.logout);

// TODO 
// router.get("/edit", authMiddleware, usersController.editUser);
// router.post("/edit", userMulterConfig.single("avatar"), validator.edit, usersController.processEdit);


module.exports = router;