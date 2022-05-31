const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  createAdminUser: async function (req, res, next) {
    const allGenres = db.Sex.findAll();
    const allRol = db.Rol.findAll();

    Promise.all([allGenres, allRol])
      .then(function ([allGenres, allRol]) {
        res.render("register/registerAdmin", { allGenres, allRol });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  storeAdminUser: async function (req, res, next) {
    const errorsValidation = validationResult(req);
    const allGenres = await db.Sex.findAll();
    const allRol = await db.Rol.findAll();
    console.log(errorsValidation);
    if (errorsValidation.errors.length > 0) {
      return res.render("register/register", {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        allGenres,
        allRol,
      });
    } else {
      await db.User.create({
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        user_sex_fk: parseInt(req.body.gender),
        user_rol_fk: parseInt(req.body.userRol),
        admin: req.body.admin,
        terms_conditions: req.body.terminosCondiciones,
      }).catch(function (err) {
        console.log(err);
      });
      res.redirect("/users/login", { message: "Admin User creado con exito." });
    }
  },
};
