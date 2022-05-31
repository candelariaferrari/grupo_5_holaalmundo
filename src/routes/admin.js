var express = require("express");
var router = express.Router();
const adminMiddlewares = require("../middlewares/adminMiddleware");
const adminController = require("../controllers/adminController");
const authMiddlewares = require("../middlewares/authMiddleware");
const validator = require("../middlewares/express-validator");

/*CATEGORIAS*/
router.get(
  "/users",
  authMiddlewares,
  adminMiddlewares,
  adminController.createAdminUser
);
router.post("/users", validator.registerAdmin, adminController.storeAdminUser);

module.exports = router;
