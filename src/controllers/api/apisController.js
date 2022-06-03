const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const apis = {
  usersList: function (req, res) {
    db.User.findAll().then((users) => {
      // array
      let newData = users.map((user) => {
        // user
        return {
          id: user.id,
          name: user.name,
          last_name: user.last_name,
          phone: user.phone,
          password: user.password,
          avatar: user.avatar,
          admin: user.admin,
          user_sex_fk: user.user_sex_fk,
          user_rol_fk: user.user_rol_fk,
          user_address: user.user_address,
          terms_conditions: user.terms_conditions,
          endpoint: "/api/users/" + user.id,
        };
      });
      let respuesta = {
        meta: {
          status: 200,
          total_users: users.length,
          url: "/api/users",
        },
        data: newData,
      };
      res.json(respuesta); // respuesta.data || respuesta.meta
    });
  },
  listStudents: function (req, res) {
    db.User.findAll({
      include: [
        {
          association: "rol",
        },
      ],
      where: {
        "$rol.description$": "Estudiante",
      },
    }).then((students) => {
      let newData = students.map((student) => {
        return {
          id: student.id,
          name: student.name,
          last_name: student.last_name,
          phone: student.phone,
          password: student.password,
          avatar: student.avatar,
          admin: student.admin,
          user_sex_fk: student.user_sex_fk,
          user_rol_fk: student.user_rol_fk,
          user_address: student.user_address,
          terms_conditions: student.terms_conditions,
        };
      });
      let respuesta = {
        meta: {
          status: 200,
          total_students: students.length,
          url: "/api/students",
        },
        data: newData,
      };
      res.json(respuesta);
    });
  },
  listTeachers: function (req, res) {
    db.User.findAll({
      include: [
        {
          association: "rol",
        },
      ],
      where: {
        "$rol.description$": "Profesor",
      },
    }).then((teachers) => {
      let newData = teachers.map((teacher) => {
        return {
          id: teacher.id,
          name: teacher.name,
          last_name: teacher.last_name,
          phone: teacher.phone,
          password: teacher.password,
          avatar: teacher.avatar,
          admin: teacher.admin,
          user_sex_fk: teacher.user_sex_fk,
          user_rol_fk: teacher.user_rol_fk,
          user_address: teacher.user_address,
          terms_conditions: teacher.terms_conditions,
        };
      });
      let respuesta = {
        meta: {
          status: 200,
          total_teachers: teachers.length,
          url: "/api/teachers",
        },
        data: newData,
      };
      res.json(respuesta);
    });
  },
  listClases: function (req, res) {
    db.Class.findAll().then((clases) => {
      let newData = clases.map((clase) => {
        return {
          id: clase.id,
          name: clase.name,
          description: clase.description,
          language: clase.language,
          week_days: clase.week_days,
          week_times: clase.week_times,
          level: clase.level,
          topics: clase.topics,
          types: clase.types,
          price: clase.price,
          discount: clase.discount,
          cap_max: clase.cap_max,
          image: clase.image,
          visited: clase.visited,
          link_class: clase.link_class,
        };
      });
      let respuesta = {
        meta: {
          status: 200,
          total_classes: clases.length,
          url: "/api/clases",
        },
        data: newData,
      };
      res.json(respuesta);
    });
  },
  userDetail: function (req, res) {
    db.User.findByPk(req.params.id).then((user) => {
      let jsonUser = {
        meta: {
          status: 200,
          url: "/api/users/" + req.params.id,
        },
        data: {
          id: user.id,
          name: user.name,
          last_name: user.last_name,
          phone: user.phone,
          password: user.password,
          avatar: user.avatar,
          admin: user.admin,
          user_sex_fk: user.user_sex_fk,
          user_rol_fk: user.user_rol_fk,
          user_address: user.user_address,
          terms_conditions: user.terms_conditions,
        },
      };
      res.json(jsonUser);
    });
  },
  clasesDetail: function (req, res) {
    db.Class.findByPk(req.params.id).then((clase) => {
      let jsonClass = {
        meta: {
          status: 200,
          url: "/api/clases/" + req.params.id,
        },
        data: {
          id: clase.id,
          name: clase.name,
          description: clase.description,
          language: clase.language,
          week_days: clase.week_days,
          week_times: clase.week_times,
          level: clase.level,
          topics: clase.topics,
          types: clase.types,
          price: clase.price,
          discount: clase.discount,
          cap_max: clase.cap_max,
          image: clase.image,
          visited: clase.visited,
          link_class: clase.link_class,
        },
      };
      res.json(jsonClass);
    });
  },
  listClasesLanguage: async function (req, res) {
    let languages = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`language`)), `Language`],
      ],
      oder: [["language", "DESC"]],
      limit: 10,
    });

    let jsonLanguage = {
      meta: {
        status: 200,
        total_language: languages.length,
        url: "/api/clases/language",
      },
      data: languages,
    };
    res.json(jsonLanguage);
  },
  listClasesWeekDays: async function (req, res) {
    let WeekDays = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_days`)), `WeekDays`],
      ],
      oder: [["week_days", "DESC"]],
      limit: 10,
    });

    let jsonWeekDays = {
      meta: {
        status: 200,
        total_WeekDays: WeekDays.length,
        url: "/api/clases/weekDays",
      },
      data: WeekDays,
    };
    res.json(jsonWeekDays);
  },
  listClasesWeekTimes: async function (req, res) {
    let WeekTimes = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`week_times`)), `WeekTimes`],
      ],
      oder: [["week_times", "DESC"]],
      limit: 10,
    });

    let jsonWeekTimes = {
      meta: {
        status: 200,
        total_WeekTimes: WeekTimes.length,
        url: "/api/clases/WeekTimes",
      },
      data: WeekTimes,
    };
    res.json(jsonWeekTimes);
  },
  listClasesTopics: async function (req, res) {
    let Topics = await db.Class.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col(`topics`)), `Topics`],
      ],
      oder: [["topics", "DESC"]],
      limit: 10,
    });

    let jsonTopics = {
      meta: {
        status: 200,
        total_Topics: Topics.length,
        url: "/api/clases/Topics",
      },
      data: Topics,
    };
    res.json(jsonTopics);
  },
  listClasesLevel: async function (req, res) {
    let Level = await db.Class.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col(`level`)), `Level`]],
      oder: [["level", "DESC"]],
      limit: 10,
    });

    let jsonLevel = {
      meta: {
        status: 200,
        total_Level: Level.length,
        url: "/api/clases/level",
      },
      data: Level,
    };
    res.json(jsonLevel);
  },
  listClasesTypes: async function (req, res) {
    let Types = await db.Class.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col(`types`)), `Types`]],
      oder: [["types", "DESC"]],
      limit: 10,
    });

    let jsonTypes = {
      meta: {
        status: 200,
        total_Types: Types.length,
        url: "/api/clases/types",
      },
      data: Types,
    };
    res.json(jsonTypes);
  },
  createCart: async function (req, res) {
    let classFound = await db.Class.findByPk(req.params.id);
    let item = await db.Item.create({
      class_name: classFound.description,
      class_price: Number(classFound.price),
      class_image: classFound.image,
      class_subtotal: Number(1) * Number(classFound.price), // Cantidad de clicks
      class_quantity: Number(1), // Como le paso la cantidad de clicks
      id_user_fk: req.session.userLogged.id,
    });
  },
  updateCart: async function (req, res) {
    await db.Item.update(
      {
        class_subtotal: Number(req.body.quantity) * Number(req.body.unit_price),
        class_quantity: Number(req.body.quantity),
      },
      {
        where: {
          id_user_fk: req.session.userLogged.id,
          id_order_fk: null,
          class_name: req.body.class_name,
        },
      }
    );
    let item = await db.Item.findOne({
      where: {
        id_user_fk: req.session.userLogged.id,
        id_order_fk: null,
        class_name: req.body.class_name,
      },
    });

    res.json(item);
  },
  deleteCart: async function (req, res){
    await db.Item.destroy({ 
      where: {
        id: req.params.id, // How do I get this params?
      },
    });
  }
};

module.exports = apis;
