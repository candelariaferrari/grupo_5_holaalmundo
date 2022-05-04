// CONSTANTES

const path = require('path');
const profesoresServices = require('../services/teachersService');
const db = require('../database/models')
const sequelize = db.sequelize
const {Op} = require('sequelize')

// BASES DE DATOS

const Class = db.Class
const users = db.User

// CONTROLADOR

let teachersController = {

    home: function(req, res) {
          
          const cantidadTemas = Class.findAll({include: [{association: "tematica"}]}, 
                                              {attributes: [[sequelize.fn("DISTINCT", sequelize.col(`tematica.idTopic`)), `countTopics`]]})
    
          const cantidadIdiomas = Class.findAll({attributes: [[sequelize.fn("DISTINCT", sequelize.col(`language`)), `countLanguage`]]})
            
          const estudiantes = users.findAll({include: [{association: "rol"}],
                                                        where: {rol_id: 1}})
                               
          const profesores = users.findAll({include: [{association: "rol"}],
                                                       where: {rol_id: 2}})
    
          Promise.all([profesores, estudiantes, cantidadIdiomas, cantidadTemas])
    
                 .then(function([profesores, estudiantes, cantidadIdiomas, cantidadTemas]){               
                 
                 res.render("teachers/homeTeachers", {profesores: profesores, 
                                                      estudiantes: estudiantes,
                                                      cantidadIdiomas: cantidadIdiomas, 
                                                      cantidadTemas: cantidadTemas})})
    
                 .catch(error => {console.log(error)})
    },
    students: function(req, res) {
              
              const estudiantes = profesoresServices.findAllStudents();
              
              res.render('teachers/viewStudents', {estudiantes: estudiantes});  
    },
    packages: function(req, res) {
              
              res.render('teachers/createPackageTeachers');
    },
    configuration: function(req, res) {
        
                   res.render('teachers/configurationTeachers');
    },
    dashboardLessons: function(req, res) {
        
                      res.render('teachers/dashboardLessons');
    },
    logout: function(req, res) {
        
            res.clearCookie('userEmail');
            req.session.destroy();
            console.log(req.session);
            return res.redirect('/');
    }
};

// EXPORTO EL CONTROLADOR

module.exports = teachersController;
