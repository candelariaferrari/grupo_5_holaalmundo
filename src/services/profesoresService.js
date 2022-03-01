// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

// ************ Service ************

const serviceProfesores = {
    
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
   
    findAllProfesores: function(){
        return JSON.parse(this.readFileProfesores());
    },
    
     // ************ Create User ***************

}

module.exports = serviceProfesores;

