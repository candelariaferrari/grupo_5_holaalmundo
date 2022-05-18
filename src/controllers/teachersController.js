const path = require('path');
const profesoresServices = require('../services/teachersService');

const db = require('../database/models');
let teachersController = {

    home: function (req, res) {
        
        res.render('teachers/homeTeachers');   

    },
    students:  function (req, res) {
        
        const estudiantes = profesoresServices.findAllStudients();
        res.render('teachers/viewStudents', {estudiantes: estudiantes});  
    },
    packages: function (req, res) {
        res.render('teachers/createPackageTeachers');
    },
    configuration: function (req, res) {
        res.render('teachers/configurationTeachers');
    },
    dashboardLessons: function (req, res) {
        res.render('teachers/dashboardLessons');
    },
    logout: function(req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};

module.exports = teachersController;