// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');

// ************ Service ************

const serviceUsers = {
    
    // ************ Rutas  ************
    // userFormFilePath: path.join(__dirname, '../data/userDataBase.json'),
    userFilePath: path.join(__dirname, '../data/userDataBase.json'),
    
    // ************ Read Files ************
    readFileUser: function(){
		return fs.readFileSync(this.userFilePath, "utf-8");
	},

 // ************ Wirte Files ************
    writeFileUsers: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(this.userFilePath, dataToString);
    },

 // ************ Genereated ID ************
    generateId: function(){
		return Math.random().toString(36).substr(2, 18);
	},

 // ************ Find All ************
    findAllUsers: function(){
        return JSON.parse(this.readFileUser());
    },

     // ************ Create User ***************
    createUser: function(payload){
        let users = this.findAllUsers();
        let userId = this.generateId();
        let user = {
            id: userId,
            ...payload 
        }
        users.push(user);
        this.writeFileUsers(users);
    }, 
    findByEmail: function(userEmail, userPassword){

        let users = this.findAllUsers();

        let userEncontrado = users.find(function(user){
             if(user.email == userEmail){
                 return user.contrasenia == userPassword
             } 
             /** Revisar como se cuadra para mostrar el error */
        });

        return userEncontrado;
    }, 
}

module.exports = serviceUsers;

