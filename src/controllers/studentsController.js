// CONSTANTES

const path = require('path');
const teacherServices = require("../services/teachersService");
const packageService = require("../services/packagesService");
const commentService = require("../services/commentService");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// BASES DE DATOS

const Class = db.Class;
const users = db.User;
const comment = db.Comment;
const sex = db.Sex;
const rol = db.Rol;

// CONTROLADOR

let studentsController = {

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

          const servicios = Class.findAll({include: [{association: "sale_class"}]})
          
          const cantidadTemas = Class.findAll({include: [{association: "tematica"}]}, 
                                              {attributes: [[sequelize.fn('DISTINCT', sequelize.col(`tematica.idTopic`)), `countTopics`]]})
          
          const cantidadIdiomas = Class.findAll({attributes: [[sequelize.fn('DISTINCT', sequelize.col(`language`)), `countLanguage`]]})
          
          const estudiantes = users.findAll({include: [{association: "rol"}],
                                             where: {rol_id: 1}})
          
          const profesores = users.findAll({include: [{association: "rol"}],
                                            where: {rol_id: 2}})
          
          const serviciosRecomendados = Class.findAll({where: {visited: 4}})
          
          const serviciosMasVendidos = Class.findAll({include: [{association: "sale_class"}],
                                                      where: {price: {[Op.gt]: 1000}}})
          
          Promise.all([servicios, profesores, estudiantes, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos])
                  
                 .then(function([servicios, profesores, estudiantes, cantidadIdiomas, cantidadTemas, serviciosRecomendados, serviciosMasVendidos]){
                       /*serviciosRecomendados: serviciosRecomendados,
                         serviciosMasVendidos: serviciosMasVendidos,
                         user: res.locals.userLogged*/
                
                 res.render('students/homeStudents', {servicios: servicios, 
                                                      profesores: profesores, 
                                                      estudiantes: estudiantes,
                                                      cantidadIdiomas:cantidadIdiomas, 
                                                      cantidadTemas:cantidadTemas,
                                                      serviciosRecomendados,
                                                      serviciosMasVendidos: serviciosMasVendidos})})
        
                 .catch(error => {console.log(error)});
    }, 
    createComment: function(req, res) {
                   //commentService.createComment(req.body);
                   //res.redirect('/home');
        
                   comment.create({nombres: req.body.nameContact,
                                   email: req.body.emailContact,
                                   description: req.body.consultaContact})
        
                          .then(() => {res.redirect('/')})
        
                          .catch(error => {console.log(error)});
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

// EXPORTO EL CONTROLADOR

module.exports = studentsController;
