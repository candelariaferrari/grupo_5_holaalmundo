const path = require('path');
const profesoresServices = require('../services/teachersService');
const packageService = require("../services/packagesService");
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
    if(errorsValidation.errors.length > 0){
        return  res.render('teachers/createPackageTeachers', {
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
        }).catch(function(err){
            console.log(err);
        })
        res.redirect('/teachers/packages');
    }
  },
  configuration: function (req, res) {
    let userLogged = req.session.userLogged
    res.render("teachers/configurationTeachers"), {userLogged: userLogged};
  },
  configurationProcess:  async function (req, res, next) {
    let userLogged = req.session.userLogged
    const errorsValidation = validationResult(req);
  
      if(errorsValidation.errors.length > 0){
          return  res.render("teachers/configurationTeachers", {
              errors: errorsValidation.mapped(),
              oldData: req.body,
              userLogged: userLogged
          })
      } else {
         await db.User.update({
              phone: req.body.phone,
              avatar: req.body.avatar
          }, 
          {
            where: {
              id: userLogged.id
            },
          }).catch(function(err){
              console.log(err);
          })
          
          return res.redirect("/")
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