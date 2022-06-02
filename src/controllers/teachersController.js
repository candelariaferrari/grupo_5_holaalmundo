const path = require("path");
const profesoresServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { all } = require("../routes/students");

let teachersController = {
  home: function (req, res) {
    const servicios = db.Class.findAll({
      // SELECT * FROM CLASS
      attributes: ["description", "language", "price"],
    });
    const cantidadTemas = db.Class.findAll({
      // SELECT COUNTDISTINCT(topics) AS countTopics FROM Class
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`topics`)), `countTopics`],
      ],
    });
    const cantidadIdiomas = db.Class.findAll({
      // SELECT COUNTDISTINCT(language) AS countLanguage FROM Class
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`language`)), `countLanguage`],
      ],
    });
    const profesores = db.User.findAll({
      // TODO more queries
      // SELECT r.description FROM USER
      // INNER JOIN ROL as r ON user.user_rol_fk = rol.id
      include: [
        {
          association: "rol",
        },
      ],
      where: {
        "$rol.description$": { [Op.like]: "%" + "Profesor" + "%" },
      },
    });
    const serviciosRecomendados = db.Class.findAll({
      where: {
        visited: 1,
      },
    });
    const serviciosMasVendidos = db.Class.findAll({
      // Where sale_class.total > 100
      where: {
        price: {
          [Op.gt]: 300,
        },
      },
    });
    Promise.all([
      servicios,
      profesores,
      cantidadIdiomas,
      cantidadTemas,
      serviciosRecomendados,
      serviciosMasVendidos,
    ])
      .then(function ([
        servicios,
        profesores,
        cantidadIdiomas,
        cantidadTemas,
        serviciosRecomendados,
        serviciosMasVendidos,
      ]) {
        res.render("teachers/homeTeachers", {
          servicios: servicios,
          profesores: profesores,
          cantidadIdiomas: cantidadIdiomas,
          cantidadTemas: cantidadTemas,
          serviciosRecomendados,
          serviciosMasVendidos: serviciosMasVendidos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createComment: function (req, res) {
    //commentService.createComment(req.body);
    //res.redirect('/home');
    comment
      .create({
        nombres: req.body.nameContact,
        email: req.body.emailContact,
        description: req.body.consultaContact,
      })
      .then(() => {
        res.redirect("/teachers/home");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  students: async function (req, res) {
    let curso = req.query.buscarCurso;
    let userLogged = req.session.userLogged.id;
    let alumnos = req.query.buscarAlumno;

    const allClass = await db.Class.findAll({
      // Clases del profesor
      include: [
        {
          association: "class_user",
        },
      ],
      where: {
        "$class_user.id$": userLogged,
      },
    });
    const filterAlumnos = await db.User.findAll({
      // Students asociados a esa clase 
      include: [
        {
          association: "user_class",
        },
      ],
      where: {
        "$user.name$": { [Op.like]: "%" + alumnos + "%" },
        // "$user_class.id_class_fk$": cursos
      },
    });

    filterAlumnos.filter(function(alumno){
      // 1. usuarios 
      // 2. si el id esta en el array (clase incluida)
      console.log(alumno);
      
    })

    const allStudents = await db.User.findAll();
    res.render("teachers/viewStudents", {
      allClass: allClass,
      filterAlumnos: filterAlumnos,
      allStudents: allStudents,
    });
  },
  detailsStudent: async function (req, res) {
    const alumno = await db.User.findByPk(req.params.id, {
      attributes: ["id", "name", "last_name", "avatar"],
    });

    const servicios = await db.Class.findAll({
      // SELECT * FROM CLASS
      include: [
        {
          association: "class_user",
        },
      ],
      where: {
        "$class_user.id$": req.params.id,
      },
    });

    res.render("teachers/detailsStudent", {
      alumno: alumno,
      servicios: servicios,
    });
  },
  packages: async function (req, res) {
    let userLogged = req.session.userLogged.id;
    const servicios = await db.Class.findAll({
      attributes: [
        "description",
        "language",
        "week_days",
        "week_times",
        "price",
      ],
      include: [
        {
          association: "class_user",
        },
      ],
      where: {
        "$class_user.id$": userLogged,
      },
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
      attributes: [[sequelize.fn("DISTINCT", sequelize.col(`types`)), `types`]],
    });

    res.render("teachers/createPackageTeachers", {
      servicios: servicios,
      allLanguages: allLanguages,
      allWeekDays: allWeekDays,
      allWeekTimes: allWeekTimes,
      allLevels: allLevels,
      allTypes: allTypes,
    });
  },
  processPackages: async function (req, res, next) {
    let userLogged = req.session.userLogged.id;
    const errorsValidation = validationResult(req);
    const servicios = await db.Class.findAll({
      attributes: [
        "description",
        "language",
        "week_days",
        "week_times",
        "price",
      ],
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
      attributes: [[sequelize.fn("DISTINCT", sequelize.col(`types`)), `types`]],
    });
    if (errorsValidation.errors.length > 0) {
      return res.render("teachers/createPackageTeachers", {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        allLanguages,
        allWeekDays,
        allWeekTimes,
        allLevels,
        allTypes,
        servicios,
      });
    } else {
      let classCreated = await db.Class.create({
        description: req.body.description,
        language: req.body.language,
        week_days: req.body.week_days,
        week_times: req.body.week_times,
        level: req.body.level,
        topics: req.body.topics,
        types: req.body.types,
        price: req.body.price,
        cap_max: req.body.cap_max,
        link_class: req.body.link_class,
      })
/* ¿Como se crea la relacion en la tabla pivot al crear la clase?*/ 
      await db.User_Class.create({
        id_user_fk: userLogged,
        id_class_fk: classCreated.id
      })
      .catch(function (err) {
        console.log(err);
      });
      res.redirect("/teachers/packages");
    }
  },
  configuration: function (req, res) {
    let userLogged = req.session.userLogged;
    res.render("teachers/configurationTeachers"), { userLogged: userLogged };
  },
  configurationProcess: async function (req, res, next) {
    let userLogged = req.session.userLogged;
    const errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
      return res.render("teachers/configurationTeachers", {
        errors: errorsValidation.mapped(),
        oldData: req.body,
        userLogged: userLogged,
      });
    } else {
      await db.User.update(
        {
          phone: req.body.phone,
          avatar: req.body.avatar,
        },
        {
          where: {
            id: userLogged.id,
          },
        }
      ).catch(function (err) {
        console.log(err);
      });

      return res.redirect("/");
    }
  },
  dashboardLessons: function (req, res) {
    res.render("teachers/dashboardLessons");
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    console.log(req.session);
    return res.redirect("/");
  },
};

module.exports = teachersController;
