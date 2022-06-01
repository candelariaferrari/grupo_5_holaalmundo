// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

const userServices = require('./usersService');
// ************ Service ************

const serviceTeachers = {
    
    // ************ Rutas  ************
    profesoresFilePath: path.join(__dirname, '../data/profesoresDataBase.json'),
    
    // ************ Read Files ************
    readFileProfesores: function(){
		return fs.readFileSync(this.profesoresFilePath, "utf-8")
	},

 // ************ Wirte Files ************
    writeFileProfesores: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(this.profesoresFilePath, dataToString);
    },

 // ************ Genereated ID ************
    generateId: function(){
		return Math.random().toString(36).substr(2, 18);
	},

 // ************ Find All ************
   
    findAllTeachers: function(){
       let profesores = userServices.findAllUsers();
       let filterProfesores = profesores.filter(function(profesor){
        return profesor.userRol == "1";
       })
       return filterProfesores;
        /* return JSON.parse(this.readFileProfesores()); */
    },
    

    // **** find studient ***//
    findAllStudients: function(){
       let estudiantes = userServices.findAllUsers();
       let filterEstudiantes = estudiantes.filter(function(estudiante){
        return estudiante.userRol == "0";
       })
       return filterEstudiantes;
    }
    
}

module.exports = serviceTeachers;

