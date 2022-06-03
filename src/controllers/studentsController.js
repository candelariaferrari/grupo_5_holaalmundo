// ************ Require's ************
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let studentsController = {
  /**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

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
    const alumnos = db.User.findAll({
      // TODO more queries
      // SELECT r.description FROM USER
      // INNER JOIN ROL as r ON user.user_rol_fk = rol.id
      include: [
        {
          association: "rol",
        },
      ],
      where: {
        "$rol.description$": { [Op.like]: "%" + "Estudiante" + "%" },
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
      alumnos,
      cantidadIdiomas,
      cantidadTemas,
      serviciosRecomendados,
      serviciosMasVendidos,
    ])
      .then(function ([
        servicios,
        profesores,
        alumnos,
        cantidadIdiomas,
        cantidadTemas,
        serviciosRecomendados,
        serviciosMasVendidos,
      ]) {
        res.render("students/homeStudents", {
          servicios: servicios,
          profesores: profesores,
          alumnos: alumnos,
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
    /*let language = [req.query.idiomas]; // [Español, Aleman, Ingles] -> [a, b] = [10, 20];
    let cursos = [req.query.cursos];
    let topics = [req.query.tematica];
    let nivelExamen = [req.query.examen];*/

    let language = req.query.idiomas; // [Español, Aleman, Ingles] -> [a, b] = [10, 20];
    let cursos = req.query.cursos;
    let topics = req.query.tematica;
    let nivelExamen = req.query.examen;

    function casteoInputs(inputs) {
      if (inputs != undefined) {
        let inputsString = inputs.toString();
        let inputsSplit = inputsString.split(","); // []
        return inputsSplit;
      }
    }

    /*let [español, ingles, portuges, aleman, frances, italiano, chino] = casteoInputs(language); // pasar los faltantes
    let [conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen] = casteoInputs(cursos); // if examen -> nivel de examen  && if conversacionInd or conversacionGrup -> Tematicas
    let [viajes, culinaria, deportes, musica, general] = casteoInputs(topics); 
    let [basico, intermedio, avanzado] = casteoInputs(nivelExamen);*/

    const profesores = await db.User.findAll({
      attributes: ["id", "name", "avatar"],
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
          { "$user_class.language$": { [Op.like]: "%" + language + "%" } }, // Español, aleman
          /*{ "$user_class.language$": { [Op.like]: "%" + ingles + "%" } },
          { "$user_class.language$": { [Op.like]: "%" + portuges + "%" } },
          { "$user_class.language$": { [Op.like]: "%" + aleman + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + frances + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + italiano + "%" } }, 
          { "$user_class.language$": { [Op.like]: "%" + chino + "%" } }, */

          // Cursos - conversacionIndividual, conversacionGrupal, claseIndividual, claseGrupal, examen
          { "$user_class.types$": { [Op.like]: "%" + cursos + "%" } },
          /*{ "$user_class.types$": { [Op.like]: "%" + conversacionIndividual + "%" } }, 
          { "$user_class.types$": { [Op.like]: "%" + conversacionGrupal + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + claseIndividual + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + claseGrupal + "%" } },
          { "$user_class.types$": { [Op.like]: "%" + examen + "%" } },*/

          // Tematicas - viajes, culinaria, deportes, musica, general
          { "$user_class.topics$": { [Op.like]: "%" + topics + "%" } },
          /*{ "$user_class.topics$": { [Op.like]: "%" + viajes + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + culinaria + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + deportes + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + musica + "%" } },
          { "$user_class.topics$": { [Op.like]: "%" + general + "%" } },*/

          // Examen - basico, intermedio, avanzado
          { "$user_class.level$": { [Op.like]: "%" + nivelExamen + "%" } },
          /*{ "$user_class.level$": { [Op.like]: "%" + basico + "%" } },
          { "$user_class.level$": { [Op.like]: "%" + intermedio + "%" } },
          { "$user_class.level$": { [Op.like]: "%" + avanzado + "%" } },*/
        ],
      },
    });

    res.render("students/viewTeachers", {
      profesores: profesores,
      profesoresFiltro: profesoresFiltro,
    });
  },
  services: async function (req, res) {
    let language = req.query.idiomas; // [Español, Aleman, Ingles] -> [a, b] = [10, 20];
    let cursos = req.query.cursos;
    let topics = req.query.tematica;
    let week_days = req.query.weekDays; // REVISAR
    let week_times = req.query.weekTimes; // REVISAR

    const servicios = await db.Class.findAll({});

    const serviciosFiltrados = await db.Class.findAll({
      where: {
        /* 
          SELECT * FROM CLASS WHERE LANGUAGE LIKE % Español % 
        */
        [Op.or]: [
          { $language$: { [Op.like]: "%" + language + "%" } },
          { $topics$: { [Op.like]: "%" + cursos + "%" } },
          { $level$: { [Op.like]: "%" + topics + "%" } },
          { $week_days$: { [Op.like]: "%" + week_days + "%" } },
          { $week_times$: { [Op.like]: "%" + week_times + "%" } },
        ],
      },
    });

    claseId = req.query.claseId;

    if (claseId != null) {
      /*
      -> Desde el backend no se usa fetch se usa desde el frontend. 
          * Se usa un archivo js 
          * Se usa document para traerme los datos 
          * 
      -> Desde el backend se usa un boton para enviar la informacion. 
      await fetch(`http://localhost:3000/api/clases/${claseId}`)
        .then((response) => response.json())
        .then((clase) => {
          console.log(clase);
        })*/
        await fetch(`http://localhost:3000/api/item/${claseId}`, {
          method: 'POST',
          body: {
            nombre: req.body.name
          }
        })
        .then((response) => response.json())
        .then((item) => {
          console.log(item);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    cantidadItems = 0;

    /*if (clase != undefined) {
      if (clase != clase) {
        // 1
        console.log("Entro en el contador");
        cantidadItems += 1;
      }
    }
    console.log(cantidadItems);
    */

    /*
    Como tomo info de la vista para procesarla en el controlador con el document.querrySelector?
    let pakageSelected = document.querySelector('.cursos');
    console.log(pakageSelected);
  
    pakageSelected.addEventListener('click', function(e) {
        console.log('Selecionado el paquete')
    })*/

    res.render("students/packageStudents", {
      servicios: servicios,
      serviciosFiltrados: serviciosFiltrados,
      cantidadItems: cantidadItems,
    });
  },
  configuration: function (req, res) {
    let userLogged = req.session.userLogged;
    res.render("students/configurationStudents"), { userLogged: userLogged };
  },
  configurationProcess: async function (req, res) {
    let userLogged = req.session.userLogged;
    const errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
      return res.render("students/configurationStudents", {
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
  detailsTeacher: async function (req, res) {
    const profesor = await db.User.findByPk(req.params.id, {
      attributes: ["id", "name", "avatar"],
    });

    const servicios = await db.Class.findAll({
      // SELECT * FROM CLASS
      // attributes: ["description", "language", "price"],
      include: [
        {
          association: "class_user",
        },
      ],
      where: {
        "$class_user.id$": req.params.id,
      },
    });

    res.render("students/detailsTeacher", {
      profesor: profesor,
      servicios: servicios,
    });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    console.log(req.session);
    return res.redirect("/");
  },
};

module.exports = studentsController;
