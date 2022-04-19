const path = require('path');
//const teacherServices = require("../services/teachersService");
//const packageService = require("../services/packagesService");
//const commentService = require("../services/commentService");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Class = db.Class;
const users = db.User;
const comment = db.Comment;
const sex = db.Sex;
const rol = db.Rol;

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

        const servicios = Class.findAll(
            {
                // Como se haria el include en la vista de home para imprimer el servicio.sale_class.total
                include: [{association: "sale_class"}]
            }
        )
        const cantidadTemas = Class.findAll(
            {
                include: [
                    {
                        // Como opera en un cruce de tablas el where (deberia aparecer uno)
                        association: "tematica"
                    }
                ]
            }, 
            {
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col(`tematica.idTopic`)), `countTopics`]
                ]
            }
        )
        const cantidadIdiomas = Class.findAll(
            {
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col(`language`)), `countLanguage`]
                ]
            }
        )
        const profesores = users.findAll(
            {
                include: [
                        {
                            // Como opera en un cruce de tablas el where (deberia aparecer uno)
                            association: "rol"
                        }
                ],
                where: {
                    rol_id: 2
                }
            }
        )
        const serviciosRecomendados = Class.findAll(
            {
                where: {
                    visited: 1
                }
            }
        )
        const serviciosMasVendidos = Class.findAll(
            {
                include: [
                        {
                            association: "sale_class"
                        }
                ],
                // Where sale_class.total > 100
                where: {
                    price: {
                        [Op.gt]: 300 
                    }
                }
            }
        )
        Promise.all([servicios, profesores, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos])
            .then(function([servicios, profesores, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos]){
                
                /*serviciosRecomendados: serviciosRecomendados,
                serviciosMasVendidos: serviciosMasVendidos,
                user: res.locals.userLogged*/
                
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
    createComment: function(req, res){
        //commentService.createComment(req.body);
        //res.redirect('/home');
        comment.create({
            nombres: req.body.nameContact,
            email: req.body.emailContact,
            description: req.body.consultaContact
        })
        .then(() =>{
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
        });
    },
    services: function(req, res) {
        const profesores = teacherServices.findAllTeachers();
        const serviciosRecomendados = packageService.findAllSuggest();
        const serviciosMasVendidos = packageService.findAllSold();
        const servicios = packageService.findAllServices();
        
        res.render('students/packageStudents', {profesores: profesores, 
                                                servicios: servicios,
                                                serviciosRecomendados: serviciosRecomendados,
                                                serviciosMasVendidos:serviciosMasVendidos});
    },
    filterTeachers: function(req, res) {
        res.render('students/viewTeachers');
    },
    configuracion: function(req, res) {       
    },
    reserva: function(req, res) {
        res.render('partials/popUpReserve');
    }, 
    configuration: function(req, res) {

        res.render('students/configurationStudents');
    }, 
    shoppingCart: function(req, res) {
        res.render('shoppingCart/shoppingCart');
    }, 
    logout: function(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};
module.exports = studentsController;