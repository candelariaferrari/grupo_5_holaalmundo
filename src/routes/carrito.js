const express = require("express");
const router = express.Router();
const cartController = require("../controllers/carritoController");
const authMiddlewares = require("../middlewares/authMiddleware");

router.get("/", authMiddlewares, cartController.listCart);
router.post("/add/:id", authMiddlewares, cartController.addItem);
router.post("/order/add", authMiddlewares, cartController.addOrder);
router.post("/item/delete/:id", cartController.destroyItem);

module.exports = router;
