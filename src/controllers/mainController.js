// ************ Require's ************
//const userServices = require("../services/usersService");
//const profesoresServices = require("../services/teachersService");
//const serviciosService = require("../services/packagesService");
//const commentService = require("../services/commentService");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let mainController = {
  home: function (req, res) {
    //const servicios2 = serviciosService.findAllServices();
    //const profesores = profesoresServices.findAllTeachers();
    const servicios = db.Class.findAll({
      // SELECT * FROM CLASS
      attributes: ['description', 'language', 'price']
    });
    const cantidadTemas = db.Class.findAll(
      {
        // SELECT COUNTDISTINCT(topics) AS countTopics FROM Class
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col(`topics`)), `countTopics`],
        ]
      }
    );
    const cantidadIdiomas = db.Class.findAll(
      {
        // SELECT COUNTDISTINCT(language) AS countLanguage FROM Class
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col(`language`)), `countLanguage`]
        ]
      }
    );
    const profesores = db.User.findAll(
      {
        // TODO more queries
        // SELECT r.description FROM USER 
        // INNER JOIN ROL as r ON user.user_rol_fk = rol.id
        include: [
          {
            association: "rol"
          }
        ],
        where: {
          "$rol.description$": { [Op.like]: '%' + "Profesor" + '%' }
        }
      }
    );
    const alumnos = db.User.findAll(
      {
        // TODO more queries
        // SELECT r.description FROM USER 
        // INNER JOIN ROL as r ON user.user_rol_fk = rol.id
        include: [
          {
            association: "rol"
          }
        ],
        where: {
          "$rol.description$": { [Op.like]: '%' + "Estudiante" + '%' }
        }
      }
    );
    Promise.all([profesores,alumnos, cantidadIdiomas, cantidadTemas, servicios])
      .then(function ([profesores,alumnos, cantidadIdiomas, cantidadTemas, servicios]) {

        let data = {
          profesores: profesores,
          alumnos,alumnos,
          cantidadIdiomas: cantidadIdiomas,
          cantidadTemas: cantidadTemas,
          servicios: servicios
        }

        res.render('homeGuest/homeGuest', { data: data });
      })
      .catch(error => {
        console.log(error);
      });
  },
  createUserCarusel: function (req, res) {
    // userServices.createUserCarusel(req, res);
    // TODO 
    res.redirect('/users/register');

  },
  createComment: function (req, res) {
    // commentService.createComment(req);
    db.Comment.create({
      name: req.body.nameContact,
      email: req.body.emailContact,
      description: req.body.consultaContact
    })
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        console.log(error);
      });
  }
};

module.exports = mainController;
