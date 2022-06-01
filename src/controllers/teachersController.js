const path = require('path');
const profesoresServices = require('../services/teachersService');
const packageService = require("../services/packagesService");
const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { all } = require('../routes/students');

let teachersController = {

  home: function (req, res) {

    res.render('teachers/homeTeachers');

  },
  students: async function (req, res) {
    let cursos = req.query.buscarCurso;
    let userLogged = req.session.userLogged.id;
    let alumnos = req.query.buscarAlumno;

    const allClass = await db.Class.findAll({
      include: [{
        association: "class_user",
      }],
      where: {
        "$class_user.id$": userLogged,
      }
    })
    const filterAlumnos = await db.User.findAll({
      include: [
        {
          association: "user_class",
        },
      ],
      where: {
       [Op.or]: { "$user.name$": { [Op.like]: "%" + alumnos + "%" } }
      }

    })
    const allStudents = await db.User.findAll();
    res.render('teachers/viewStudents', { allClass: allClass, filterAlumnos: filterAlumnos, allStudents: allStudents });
  },
  detailsStudent: async function (req, res) {
    const alumno = await db.User.findByPk(req.params.id,{
      attributes: ["id", "name","last_name", "avatar"],
    });
    
    const servicios = await db.Class.findAll({
      // SELECT * FROM CLASS
      attributes: ["description", "language", "price"],
    });
    console.log(alumno)
    res.render("teachers/detailsStudent", {alumno: alumno, servicios:servicios });
  },
  packages: async function (req, res) {
    const servicios = await db.Class.findAll({
      attributes: ["description", "language", "week_days", "week_times", "price"],
    });
    const allLanguages = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`language`)), `language`],
      ],
    });
    const allWeekDays = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_days`)), `days`],
      ],
    });
    const allWeekTimes = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_times`)), `times`],
      ],
    });
    const allLevels = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`level`)), `levels`],
      ],
    });
    const allTypes = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`types`)), `types`],
      ],
    });

    res.render('teachers/createPackageTeachers',
      {
        servicios: servicios,
        allLanguages: allLanguages,
        allWeekDays: allWeekDays,
        allWeekTimes: allWeekTimes,
        allLevels: allLevels,
        allTypes: allTypes,
      });

  },
  processPackages: async function (req, res, next) {
    const errorsValidation = validationResult(req);
    const servicios = await db.Class.findAll({
      attributes: ["description", "language", "week_days", "week_times", "price"],
    });
    const allLanguages = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`language`)), `language`],
      ],
    });
    const allWeekDays = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_days`)), `days`],
      ],
    });
    const allWeekTimes = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_times`)), `times`],
      ],
    });
    const allLevels = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`level`)), `levels`],
      ],
    });
    const allTypes = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`types`)), `types`],
      ],
    });
    if (errorsValidation.errors.length > 0) {
      return res.render('teachers/createPackageTeachers', {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        allLanguages,
        allWeekDays,
        allWeekTimes,
        allLevels,
        allTypes,
        servicios
      });
    } else {
      await db.Class.create({
        description: req.body.description,
        language: req.body.language,
        week_days: req.body.week_days,
        week_times: req.body.week_times,
        level: req.body.level,
        topics: req.body.topics,
        types: req.body.types,
        price: req.body.price,
        cap_max: req.body.cap_max,
        link_class: req.body.link_class
      }).catch(function (err) {
        console.log(err);
      })
      res.redirect('/teachers/packages');
    }
  },
  configuration: function (req, res) {
    let userLogged = req.session.userLogged
    console.log(userLogged.name + " USUARIO LOGGED")
    res.render('teachers/configurationTeachers'), { userLogged: userLogged };
  },
  configurationProcess: async function (req, res, next) {
    let userLogged = req.session.userLogged
    const errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
      return res.render("teachers/configurationTeachers", {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        userLogged: userLogged
      });
    } else {
      await db.User.update({
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        avatar: req.body.avatar
      },
        {
          where: {
            id: userLogged.id
          },
        }).catch(function (err) {
          console.log(err);
        })

      return res.redirect('/')
      //console.log("Esto viene en el body al modificar un usuario", req.body.name);
    }
  },
  dashboardLessons: function (req, res) {
    res.render('teachers/dashboardLessons');
  },
  logout: function (req, res) {
    res.clearCookie('userEmail');
    req.session.destroy();
    console.log(req.session);
    return res.redirect('/');
  }
};

module.exports = teachersController;