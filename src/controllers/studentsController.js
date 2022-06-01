// ************ Require's ************
const teacherServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const commentService = require("../services/commentService");
const usersService = require("../services/usersService");

const { validationResult } = require("express-validator");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let studentsController = {
  /**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

  casteoInputs: function(inputs){
    if(inputs != undefined) {
      let inputsString = inputs.toString();
      return inputsSplit = inputsString.split(','); // []
    }
  },
  home: function (req, res) {
    //const servicios = packageService.findAllServices();
    //const profesores = teacherServices.findAllTeachers();
    //const serviciosRecomendados = packageService.findAllSuggest();
    //const serviciosMasVendidos = packageService.findAllSold();

    /*res.render('students/homeStudents', {servicios: servicios, 
                                        serviciosRecomendados: serviciosRecomendados,
                                        serviciosMasVendidos: serviciosMasVendidos,
                                        profesores: profesores, 
                                        user: res.locals.userLogged});*/

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
        res.render("students/homeStudents", {
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
        res.redirect("/students/home");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  filterTeachers: async function (req, res) {
    let language = [req.query.idiomas]; // [Español, Aleman, Ingles] -> [a, b] = [10, 20];
    let cursos = [req.query.cursos];
    let topics = [req.query.tematica];
    let nivelExamen = [req.query.examen];

    function casteoInputs(inputs) {
      if (inputs != undefined) {
        let inputsString = inputs.toString();
        let inputsSplit = inputsString.split(","); // []
        return inputsSplit;
      }
    }

    let [español, ingles, portuges, aleman, frances, italiano, chino] = casteoInputs(language); // pasar los faltantes
    let [conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen] = casteoInputs(cursos); // if examen -> nivel de examen  && if conversacionInd or conversacionGrup -> Tematicas
    let [viajes, culinaria, deportes, musica, general] = casteoInputs(topics); 
    let [basico, intermedio, avanzado] = casteoInputs(nivelExamen); 
    
    const profesores = await db.User.findAll({
      attributes: ["name", "avatar"],
      where: {
        user_rol_fk: {
          [Op.eq]: 2,
        },
      },
    });

    const profesoresFiltro = await db.User.findAll({
      // SELECT *
      // FROM user
      // INNER JOIN user_class
      // ON user.id = user_class.id_user_fk
      // INNER JOIN class
      // ON class.id = user_class.id_class_fk;
      // WHERE language LIKE "" OR
      // topics LIKE ""

      include: [
        {
          association: "user_class",
        },
      ],
      where: {
        user_rol_fk: {
          [Op.eq]: 2,
        },
        [Op.or]: [
          // Idiomas -> español, ingles, portuges, aleman, frances, italiano, chino
          { "$user_class.language$": español }, // Español, aleman
          { "$user_class.language$": { [Op.like]: "%" + ingles + "%" } },
          { "$user_class.language$": { [Op.like]: "%" + portuges + "%" } },
          { "$user_class.language$": { [Op.like]: "%" + aleman + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + frances + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + italiano + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + chino + "%" } }, 

          // Cursos - conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen
          { "$user_class.types$": { [Op.like]: "%" + conversacionIndividual + "%" } }, 
          { "$user_class.types$": { [Op.like]: "%" + conversacionGrupal + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + claseIndividual + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + claseGrupal + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + examen + "%" } },

          // Tematicas - viajes, culinaria, deportes, musica, general
          { "$user_class.topics$": { [Op.like]: "%" + viajes + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + culinaria + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + deportes + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + musica + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + general + "%" } },

          // Examen - basico, intermedio, avanzado
          { "$user_class.level$": { [Op.like]: "%" + basico + "%" } },
          { "$user_class.level$": { [Op.like]: "%" + intermedio + "%" } },
          { "$user_class.level$": { [Op.like]: "%" + avanzado + "%" } },
        ],
      },
    });

    res.render("students/viewTeachers", {
      profesores: profesores,
      profesoresFiltro: profesoresFiltro,
    });
  },
  services: async function (req, res) {
    // const profesores = teacherServices.findAllTeachers();
    // const serviciosRecomendados = packageService.findAllSuggest();
    // const servicios = packageService.findAllServices();

    let language = [req.query.idiomas]; // [Español, Aleman, Ingles] -> [a, b] = [10, 20];
    let cursos = [req.query.cursos];
    let topics = [req.query.tematica]; 
    // let week_days = [req.query.weekDays]; // [Lunes, Miercoles] || [Lunes, Miercoles, Viernes]
    // console.log(week_days);
    // let week_times = [req.query.weekTimes]; // 8:00-10:00 

    function casteoInputs(inputs) {
      if (inputs != undefined) {
        let inputsString = inputs.toString();
        let inputsSplit = inputsString.split(","); // []
        return inputsSplit;
      }
    }

    let [español, ingles, portuges, aleman, frances, italiano, chino] = casteoInputs(language); 
    let [conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen] = casteoInputs(cursos); // if examen -> nivel de examen  && if conversacionInd or conversacionGrup -> Tematicas
    let [viajes, culinaria, deportes, musica, general] = casteoInputs(topics); 
    // let [lunes_miercoles, martes_jueves, lunes_viernes, lunes_miercoles_viernes, martes_miercoles, martes_viernes, miercoles_jueves] = casteoInputs(week_days);
    // let [ocho_diez, nueve_once, diez_doce, once_una, una_tres, doce_dos, tres_cinco, cuatro_seis, cinco_siete, seis_ocho] = casteoInputs(week_times);

    const servicios = await db.Class.findAll({
      attributes: ["price", "language", "description"],
    });

    const serviciosFiltrados = await db.Class.findAll({
      where: {
        [Op.or]: [
           // Idiomas -> español, ingles, portuges, aleman, frances, italiano, chino
           { "$language$": { [Op.like]: "%" + ingles + "%" } },
           { "$language$": { [Op.like]: "%" + español + "%" } }, 
           { "$language$": { [Op.like]: "%" + portuges + "%" } },
           { "$language$": { [Op.like]: "%" + aleman + "%" } }, 
           { "$language$": { [Op.like]: "%" + frances + "%" } }, 
           { "$language$": { [Op.like]: "%" + italiano + "%" } }, 
           { "$language$": { [Op.like]: "%" + chino + "%" } },
           
          // Cursos - conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen
          { "$types$": { [Op.like]: "%" + conversacionIndividual + "%" } }, 
          { "$types$": { [Op.like]: "%" + conversacionGrupal + "%" } },
          { "$types$": { [Op.like]: "%" + claseIndividual + "%" } },
          { "$types$": { [Op.like]: "%" + claseGrupal + "%" } },
          { "$types$": { [Op.like]: "%" + examen + "%" } },

          // Tematicas - viajes, culinaria, deportes, musica, general
          { "$topics$": { [Op.like]: "%" + viajes + "%" } },
          { "$topics$": { [Op.like]: "%" + culinaria + "%" } },
          { "$topics$": { [Op.like]: "%" + deportes + "%" } },
          { "$topics$": { [Op.like]: "%" + musica + "%" } },
          { "$topics$": { [Op.like]: "%" + general + "%" } },

          // week_days - lunes_miercoles, martes_jueves, lunes_viernes, lunes_miercoles_viernes, martes_miercoles, martes_viernes, miercoles_jueves
          /*{ "$week_days$": lunes_miercoles },
          { "$week_days$": martes_jueves },
          { "$week_days$": lunes_viernes },
          { "$week_days$": lunes_miercoles_viernes },
          { "$week_days$": martes_miercoles },
          { "$week_days$": martes_viernes },
          { "$week_days$": miercoles_jueves },*/

          // week_times - ocho_diez, nueve_once, diez_doce, once_una, una_tres, doce_dos, tres_cinco, cuatro_seis, cinco_siete, seis_ocho
          /*{ "$week_times$": ocho_diez },
          { "$week_times$": nueve_once },
          { "$week_times$": diez_doce },
          { "$week_times$": once_una },
          { "$week_times$": una_tres },
          { "$week_times$": doce_dos },
          { "$week_times$": tres_cinco },
          { "$week_times$": cuatro_seis },
          { "$week_times$": cinco_siete }, 
          { "$week_times$": seis_ocho },*/

        ],
      },
    });
    res.render("students/packageStudents", {
      servicios: servicios,
      serviciosFiltrados: serviciosFiltrados,
    });
  },
  configuration: function (req, res) {
    res.render("students/configurationStudents")
  },
  configurationProcess:  async function (req, res, next) {
  
    const errorsValidation = validationResult(req);

      console.log("ERRORES DEL EXPRESS V" + errorsValidation);
      if(errorsValidation.errors.length > 0){
          return  res.render("students/configurationStudents", {
              errors: errorsValidation.mapped(),
              oldData: req.body,
          });
      } else {
         await db.User.update({
              name: req.body.name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              avatar: req.body.avatar
          }).catch(function(err){
              console.log(err);
          })
          //console.log("Esto viene en el body al modificar un usuario", req.body.name);
  }
},
  shoppingCart: function (req, res) {
    res.render("shoppingCart/shoppingCart");
  },
  detailsTeacher: async function (req, res) {
    const profesor = await db.User.findByPk(req.params.id,{
      attributes: ["id", "name", "avatar"],
    });
    
    const servicios = await db.Class.findAll({
      // SELECT * FROM CLASS
      attributes: ["description", "language", "price"],
    });
    console.log(profesor)
    res.render("students/detailsTeacher", { profesor: profesor, servicios: servicios });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    console.log(req.session);
    return res.redirect("/");
  },
};

module.exports = studentsController;
