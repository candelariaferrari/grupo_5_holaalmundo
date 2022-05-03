// ************ Require's ************
//const userServices = require("../services/usersService");
//const profesoresServices = require("../services/teachersService");
//const serviciosService = require("../services/packagesService");
//const commentService = require("../services/commentService");

const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Class = db.Class;
const users = db.User;
const comment = db.Comment;
const sex = db.Sex;
const rol = db.Rol;

let mainController = {

    home: function(req, res) {
       //const servicios2 = serviciosService.findAllServices();
       //const profesores = profesoresServices.findAllTeachers();
       
        const allGenres = sex.findAll()
        const allRol = rol.findAll()
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
        Promise.all([servicios, profesores, cantidadIdiomas, cantidadTemas, allGenres, allRol])
            .then(function([servicios, profesores, cantidadIdiomas, cantidadTemas, allGenres, allRol]){
                       
                
                let data = {
                    servicios: servicios, 
                    profesores: profesores, 
                    cantidadIdiomas: cantidadIdiomas, 
                    cantidadTemas: cantidadTemas, 
                    allGenres: allGenres, 
                    allRol: allRol}
                
                res.render('homeGuest/homeGuest', {data: data})
            })
            .catch(error => {
                console.log(error);
        });
    },
    createUserCarusel: function(req, res) {
        // userServices.createUserCarusel(req, res);
        res.redirect('/register')
        
    },
    createComment: function(req, res){
        // commentService.createComment(req);
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
    login: function(req, res) {
        res.render('login/login');
    },
    userValidation: function(req, res) {
        // userServices.findByEmail(req, res);
        const errorsValidation = validationResult(req);

        if(!errorsValidation.isEmpty()){
            return res.render("login/login", { 
                errors: errorsValidation.mapped(),
                oldData: req.body 
            });
        } else {
            users.findOne({
                where: {
                    email: req.body.email 
                }
            }).then( usuarioEncontrado => {
                
                if(usuarioEncontrado){
        
                    let password = req.body.password;
                    let isOkThePassword = bcrypt.compareSync(password, usuarioEncontrado.password);
                    
                    if(isOkThePassword){
                        delete usuarioEncontrado.password;
                        delete usuarioEncontrado.validationPassword;

                         // Creamos una Session del usuario
                        req.session.userLogged = usuarioEncontrado;

                        // Creamos una cookie para recordar usuario
                        if(req.body.remember_user){
                            res.cookie('userEmail', req.body.email, {maxAge: 60000 * 60 * 24})
                        } 

                        // Redireccionamos una vez pasa la validacion del login
                        
                        if(usuarioEncontrado.rol_id == 1){
                            res.redirect('/students/home');
                        } else if (usuarioEncontrado.rol_id == 2) {
                            res.redirect('/teachers/home');
                        } else {
                            res.redirect('/')
                        }
                    }
                }
            }) 
        }
    },
    register: function(req, res) {
        const allGenres = sex.findAll()

        const allRol = rol.findAll()
        
        Promise.all([allGenres, allRol])
            .then(function([allGenres, allRol]){ 
                res.render('register/register', {allGenres, allRol});
            })
            .catch(error => {
                console.log(error);
        })
    },
    createUser: function(req, res){
        // userServices.createUser(req, res);
        const allGenres = sex.findAll()
        const allRol = rol.findAll()
        const errorsValidation = validationResult(req);

        Promise.all([allGenres, allRol])
            .then(function([allGenres, allRol]){ 
                if(!errorsValidation.isEmpty()){
                   return  res.render('register/register', {
                        errors: errorsValidation.mapped(),
                        oldData: req.body,
                        allGenres, 
                        allRol});
                } else {

                    users.create({
                        name: req.body.name,
                        lastName: req.body.lastName,
                        phone: req.body.phone, 
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10), 
                        validationPassword: bcrypt.hashSync(req.body.validationPassword, 10), 
                        sex_id: parseInt(req.body.gender),
                        rol_id: parseInt(req.body.userRol),
                        terms_condition: req.body.terminosCondiciones    
                    })
                }
            })
            .then(() =>{
                res.redirect('/login');
            })
            .catch(error => {
                console.log(error);
        });
    }
};

module.exports = mainController;
