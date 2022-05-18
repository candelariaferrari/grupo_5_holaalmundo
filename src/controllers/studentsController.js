// ************ Require's ************
const teacherServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const commentService = require("../services/commentService");
const usersService = require("../services/usersService");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let studentsController = {

/**  Aqui van los metodos que se encargan de manejar a los estudiantes*/

    home: function(req, res) {
        
        //const servicios = packageService.findAllServices();
        //const profesores = teacherServices.findAllTeachers();
        //const serviciosRecomendados = packageService.findAllSuggest();
        //const serviciosMasVendidos = packageService.findAllSold();
        
        /*res.render('students/homeStudents', {servicios: servicios, 
                                        serviciosRecomendados: serviciosRecomendados,
                                        serviciosMasVendidos: serviciosMasVendidos,
                                        profesores: profesores, 
                                        user: res.locals.userLogged});*/

        const servicios = db.Class.findAll(
            {
                // SELECT * FROM CLASS
                attributes: ['description', 'language', 'price']
            }
        );
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
                    "$rol.description$": { [Op.like]: '%' + "Profesor" + '%'}
                }
            }
        );
        const serviciosRecomendados = db.Class.findAll(
            {
                where: {
                    visited: 1
                }
            }
        );
        const serviciosMasVendidos = db.Class.findAll(
            {
                // Where sale_class.total > 100
                where: {
                    price: {
                        [Op.gt]: 300 
                    }
                }
            }
        );
        Promise.all([servicios, profesores, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos])
            .then(function([servicios, profesores, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos]){
                             
                res.render('students/homeStudents', {servicios: servicios, 
                                                    profesores: profesores, 
                                                    cantidadIdiomas:cantidadIdiomas, 
                                                    cantidadTemas:cantidadTemas,
                                                    serviciosRecomendados,
                                                    serviciosMasVendidos: serviciosMasVendidos})
            })
            .catch(error => {
                console.log(error);
        });
    }, 
    createComment: function(req, res) {
        //commentService.createComment(req.body);
        //res.redirect('/home');
        comment.create({
            nombres: req.body.nameContact,
            email: req.body.emailContact,
            description: req.body.consultaContact
        })
        .then(() =>{
            res.redirect('/students/home');
        })
        .catch(error => {
            console.log(error);
        });
    },
    filterTeachers: async function(req, res) {

        let language = req.query.idiomas; // [Español, Aleman, Ingles] 
        let cursos = req.query.cursos;
        let topics = req.query.tematica;
        let nivelExamen = req.query.examen;

        if(language != undefined) {
            let langagueString = language.toString();
            let languageSplit = langagueString.split(',');
            console.log(languageSplit);
            for(let i = 0; i < languageSplit.length; i++){
                language = languageSplit[i] // Spanish
            }
        }
        
        const profesores =  await db.User.findAll({

            attributes: ['name', 'avatar'],
            where: {
                user_rol_fk: {
                    [Op.eq]: 2
                }
            }
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
                    association: "user_class"
                }
            ],
            where: {
                user_rol_fk: {
                    [Op.eq]: 2
                },
                [Op.or]: [
                    {'$user_class.language$': { [Op.like]: '%' + language + '%'}}, // Español, aleman
                    {'$user_class.types$': { [Op.like]: '%' + cursos + '%'}}, 
                    {'$user_class.topics$': { [Op.like]: '%' + topics + '%'}}, 
                    {'$user_class.level$': { [Op.like]: '%' + nivelExamen + '%'}}, 
                ]
                 
            }
        });

        res.render('students/viewTeachers', {profesores: profesores, 
                                            profesoresFiltro: profesoresFiltro});
            
    },
    services: async function(req, res) {
        const profesores = teacherServices.findAllTeachers();
        // const serviciosRecomendados = packageService.findAllSuggest();
        // const servicios = packageService.findAllServices();

        let language = req.query.idiomas; // [] 
        let cursos = req.query.cursos;
        let topics = req.query.tematica;
        let week_days = ""; // [Lunes, Miercoles]
        let week_times = ""; // 8:00 am - 11:00 am
        
        const servicios =  await db.Class.findAll({

            attributes: ['price', 'language', 'description']
            
        });

        const serviciosFiltrados = await db.Class.findAll({

            where: {
                [Op.or]: [
                    {'$language$': { [Op.like]: '%' + language + '%'}}, 
                    {'$types$': { [Op.like]: '%' + cursos + '%'}}, 
                    {'$topics$': { [Op.like]: '%' + topics + '%'}}, 
                ]
                 
            }
        });

 
        res.render('students/packageStudents', { servicios: servicios,
                                                serviciosFiltrados: serviciosFiltrados});
    },
    configuration:function(req, res) {
        
        res.render('students/configurationStudents');
    }, 
    shoppingCart: function(req, res) {
        res.render('shoppingCart/shoppingCart');
    }, 
    detailsTeacher: async function(req, res) {
       
        const servicios = await db.Class.findAll(
            {
                // SELECT * FROM CLASS
                attributes: ['description', 'language', 'price']
            }
        );
        res.render('students/detailsTeacher', {servicios: servicios});
    }, 
    logout: function(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};
module.exports = studentsController;