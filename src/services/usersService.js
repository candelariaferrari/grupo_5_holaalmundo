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
    createUser: function(req, res){

        const errorsValidation = validationResult(req);
        
        if(errorsValidation.errors.length > 0) {
			return res.render('Registro/register', 
							  {errors: errorsValidation.mapped(),
							   oldData: req.body});
		} else {
            let users = this.findAllUsers();
            let userId = this.generateId();
            let password = req.body.contrasenia
            let passEncoded = bcrypt.hashSync(password, 10);
            console.log(password);
            console.log(passEncoded);
            let user = {
                id: userId,
                ...req.body, 
                contrasenia: passEncoded,    
            }
            
            console.log("Esta es la contraseña encriptada " + user.contrasenia)
            users.push(user);
            this.writeFileUsers(users);
        }
    }, 
    findByEmail: function(req, res){

        const errorsValidation = validationResult(req);
        
        if(errorsValidation.errors.length > 0) {
            //return res.send(errorsValidation);
			return res.render('Login/login', 
							  {errors: errorsValidation.mapped(),
							   oldData: req.body});
		} else {
            let users = this.findAllUsers();
            let userEncontrado = users.find(function(user){
                return user.email == req.body.email
            });

            let password = req.body.contrasenia;
            let decodePassword = bcrypt.compareSync(password, userEncontrado.contrasenia);
            if(decodePassword){
                // Borrar la propiedad del password
                delete userEncontrado.contrasenia;

                // Cookies
                // if(req.body.remeber_user){ se debe poner el req. del boton de recodar usuario
                if(true){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 30) * 2})
                } 

                // Session 
                req.session.userLogged = userEncontrado;
                if(userEncontrado.userRol == "Estudiante"){
                    //res.render('Home/InicioLogged', {user: req.session.userLogged})
                    res.redirect('/estudiantes/inicioAlumnos');
                } else if (userEncontrado.userRol == "Profesor") {
                    //res.render('Home-Profesores/inicioProfes', {user: req.session.userLogged})
                    res.redirect('/profesores/inicioProfesores');
                } else {
                    res.redirect('/')
                }
            } else {
                res.send(error);
            }
        }
    }, 
    emailValidation: function(req) {
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
                    return user.contrasenia == password
                } 
        });
        console.log("El usuario esta validado " + userEncontrado);
        return userEncontrado;
    }, 
    findByField: function(field, text){
        let allUsers = this.findAllUsers();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}

module.exports = serviceUsers;

