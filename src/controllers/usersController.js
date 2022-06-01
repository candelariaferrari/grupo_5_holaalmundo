const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const users = {
  login: (req, res, next) => {
    res.render('login/login');
  },
  processLogin: (req, res, next) => {
    const errorsValidation = validationResult(req);
    console.log(errorsValidation);
    if (!errorsValidation.isEmpty()) {
      return res.render("login/login", {
        errors: errorsValidation.mapped(),
        oldData: req.body,
      });
    } else {
      db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(usuarioEncontrado => {

        if (usuarioEncontrado) {

          //console.log('Entro en el controlador - Llego el user', usuarioEncontrado)

          let password = req.body.password;

          let isOkThePassword = bcrypt.compareSync(password, usuarioEncontrado.password);

          if (isOkThePassword) {
            delete usuarioEncontrado.password;
            delete usuarioEncontrado.validationPassword;

            // Creamos una Session del usuario
            req.session.userLogged = usuarioEncontrado;

            // Creamos una cookie para recordar usuario
            if (req.body.remember_user) {
              res.cookie('userEmail', req.body.email, { maxAge: 60000 * 60 * 24 })
            }

            // Redireccionamos una vez pasa la validacion del login

            if (usuarioEncontrado.user_rol_fk == 1) {
              res.redirect('/students/home');
            } else if (usuarioEncontrado.user_rol_fk == 2) {
              res.redirect('/teachers/home');
            } else {
              res.redirect('/')
            }
          }
        }

      });
    }
  },
  register: (req, res, next) => {
    const allGenres = db.Sex.findAll();
    const allRol = db.Rol.findAll();

    Promise.all([allGenres, allRol])
      .then(function ([allGenres, allRol]) {
        res.render('register/register', { allGenres, allRol });
      })
      .catch(error => {
        console.log(error);
      })
  },
  processRegister: async (req, res, next) => {
    const errorsValidation = validationResult(req);
    const allGenres = await db.Sex.findAll();
    const allRol = await db.Rol.findAll();
    console.log(errorsValidation);
    if (errorsValidation.errors.length > 0) {
      return res.render('register/register', {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        allGenres,
        allRol
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
        terms_conditions: req.body.terminosCondiciones
      }).catch(function (err) {
        console.log(err);
      })
      res.redirect('/users/login');
    }
  },
  editUser: (req, res) => {
    // TODO 
    res.render("editUsers")
  },
  processEdit: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await db.User.update({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        type_customer: req.body.type_customer,
        avatar: req.file ? req.file.filename : req.session.usuarioLogueado.avatar,
        address: req.body.address,
        phone: req.body.phone,
        dni: req.body.dni,
        post_code: req.body.post_code,
        province: req.body.province
      }, {
        where: {
          id: req.session.usuarioLogueado.id
        }
      });
      let userFound = await db.User.findByPk(req.session.usuarioLogueado.id)
      req.session.usuarioLogueado = userFound;
      res.redirect("/");

    } else {
      res.render("editUsers", { errors: errors.errors });

    }
  },
  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/");
  }
}

module.exports = users;