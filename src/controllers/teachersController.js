const path = require('path');
const profesoresServices = require('../services/teachersService');


let teachersController = {

    home: function (req, res) {
        res.render('teachers/homeTeachers');   

    },
    students: function (req, res) {
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
};

module.exports = teachersController;