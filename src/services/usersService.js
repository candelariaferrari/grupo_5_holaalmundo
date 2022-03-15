// ************ Require's ************
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const res = require("express/lib/response");
const bcrypt = require("bcrypt");

// ************ Variables globales ************

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
    createUserCarusel: function(req, res){
        // REVISAR
        const errorsValidation = validationResult(req);
      
        if(errorsValidation.errors.length > 0) {
			return res.render('homeGuest/homeGuest', 
							  {errors: errorsValidation.mapped(),
							   oldData: req.body});
		} else {
            let users = this.findAllUsers();
            let userId = this.generateId();
            let password = req.body.password;
            let passEncoded = bcrypt.hashSync(password, 10);
        
            let user = {
                id: userId,
                ...req.body, 
                // Revisar lo de subir imagenes image: 'persona-00.png',
                password: passEncoded,
            }
            
            users.push(user);
            this.writeFileUsers(users);
        
        }
          
    }, 
    createUser: function(req, res){

        const errorsValidation = validationResult(req);
      
        if(errorsValidation.errors.length > 0) {
			return res.render('register/register', 
							  {errors: errorsValidation.mapped(),
							   oldData: req.body});
		} else {
            let users = this.findAllUsers();
            let userId = this.generateId();
            let password = req.body.password;
            let passEncoded = bcrypt.hashSync(password, 10);
            let validationPassEncode = bcrypt.hashSync(req.body.validationPassword, 10);
        
            let user = {
                id: userId,
                ...req.body, 
                // Revisar lo de subir imagenes image: 'persona-00.png',
                password: passEncoded,
                validationPassword: validationPassEncode
            }
            
            users.push(user);
            this.writeFileUsers(users);
        
        }

    }, 
    emailFound: function(req) {
        // Se usa en las validaciones
        let users = this.findAllUsers();

        let userEncontrado = users.find(function(user){
            return user.email == req.body.email
            });

            return userEncontrado;
    },
    findPassword: function(email, password) {
        let users = this.findAllUsers();

        let userEncontrado = users.find(function(user){
                if(user.email == email){
                    return user.password == password
                } 
        });
        return userEncontrado;
    }, 
    findByEmail: function(req, res){

        const errorsValidation = validationResult(req);
        
        if(errorsValidation.errors.length > 0) {
			return res.render('login/login', 
							  {errors: errorsValidation.mapped(),
							   oldData: req.body});
		} else {

            let userToLogin = this.emailFound(req);
            
            if(userToLogin){
                let password = req.body.password;
                let isOkThePassword = bcrypt.compareSync(password, userToLogin.password);
                
                if(isOkThePassword){
                    delete userToLogin.password;
                    delete userToLogin.validationPassword;
                    
                    console.log("No se elimina la contraseña al enviar el usuario a session: " + userToLogin);
                    // Creamos una Session del usuario
                    req.session.userLogged = userToLogin;
                    // Lo pasamos a variables glabales
            
                    // Creamos una cookie para recordar usuario
                    // if(req.body.remeber_user){ se debe poner el req. del boton de recodar usuario
                    if(req.body.remember_user){
                        res.cookie('userEmail', req.body.email, {maxAge: 60 * 1000})
                    } 
                
                    // Redireccionamos una vez pasa la validacion del login
                    if(userToLogin.userRol == "0"){
                        res.redirect('/students/home');
                    } else if (userToLogin.userRol == "1") {
                        res.redirect('/teachers/home');
                    } else {
                        res.redirect('/')
                    }
                } 
            }
        }   
    }, 
    findByField: function(field, text){
        let allUsers = this.findAllUsers();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}

module.exports = serviceUsers;

