const path = require('path');
const profesoresServices = require('../services/teachersService');
const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
let teachersController = {

  home: function (req, res) {

    res.render('teachers/homeTeachers');

  },
  students: function (req, res) {

    const estudiantes = profesoresServices.findAllStudients();
    res.render('teachers/viewStudents', { estudiantes: estudiantes });
  },
  packages: async function (req, res) {
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
    /* console.log(allLevels) */
    /*  */
    res.render('teachers/createPackageTeachers',
    {
      allLanguages: allLanguages,
      allWeekDays: allWeekDays,
      allWeekTimes: allWeekTimes, 
      allLevels: allLevels,
      allTypes: allTypes
    });

  },
  processPackages: async function (req, res, next) {
    const errorsValidation = validationResult(req);
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

    console.log("ERRORES DEL EXPRESS V" + errorsValidation);
    if(errorsValidation.errors.length > 0){
        return  res.render('teachers/createPackageTeachers', {
            errors: errorsValidation.mapped(),
            oldData: req.body,
            allLanguages,
            allWeekDays,
            allWeekTimes, 
            allLevels,
            allTypes,
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
        }).catch(function(err){
            console.log(err);
        })
        console.log("Esto viene en el body al crear un paquete", req.body.language);
        res.redirect('/teachers/packages');
    }
  },
  configuration: function (req, res) {
    res.render('teachers/configurationTeachers');
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