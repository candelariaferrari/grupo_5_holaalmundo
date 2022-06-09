var express = require("express");
var router = express.Router();
const apisController = require("../controllers/api/apisController");

/* GET home page. */
router.get("/users", apisController.usersList); // TODOS LOS USUARIOS /api/users
router.get("/students", apisController.listStudents);
router.get("/teachers", apisController.listTeachers);
router.get("/clases", apisController.listClases);
router.get("/clases/language", apisController.listClasesLanguage);
router.get("/clases/weekDays", apisController.listClasesWeekDays);
router.get("/clases/weekTimes", apisController.listClasesWeekTimes);
router.get("/clases/topics", apisController.listClasesTopics);
router.get("/clases/level", apisController.listClasesLevel);
router.get("/clases/types", apisController.listClasesTypes);
router.get("/clases/clasesLanguage", apisController.listClasesLanguage)

router.post("/cart/update", apisController.updateCart);
router.post("/cart/delete/:id", apisController.deleteCart);

router.get("/users/:id", apisController.userDetail); // SLECT * FROM USERS WHERE ID = 1
router.get("/clases/:id", apisController.clasesDetail);
router.post("/item/:id", apisController.createCart);


/*
router.get('/users/mens', apisController.usersMens);
router.get('/users/woman', apisController.usersWoman);*/

module.exports = router;
