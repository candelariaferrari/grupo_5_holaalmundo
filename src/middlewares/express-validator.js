// CONSTANTES

const {check, body, validationResult} = require('express-validator');
const fs = require('fs');
const path = require ('path');
const bcrypt = require('bcrypt');
const db = require('../database/models');
// const userServices = require('../services/usersService');

// VALIDACIONES PARA LOS CAMPOS DEL REGISTRO 

const validar = 
{
register: [
           body('name')
                       .notEmpty()
                       .withMessage('Ingresa tu nombre')
                       .bail()
                       .isLength({min:3})
                       .withMessage('El campo nombre debe tener un mínimo de 3 caracteres'),
           body('lastName')
                           .notEmpty()
                           .withMessage('Ingresa tu apellido')
                           .bail()
                           .isLength({min:3})
                           .withMessage('El campo apellido debe tener un mínimo de 3 caracteres'),
           body('phone')
                        .notEmpty()
                        .withMessage('Ingresa tu número de celular')
                        .bail()
                        .isNumeric({no_symbols:true})
                        .withMessage('El campo celular debe contener únicamente números'),
           body('email')
                        .notEmpty()
                        .withMessage('Ingresa tu email')
                        .bail()
                        .custom((value, {req}) => {return db.User.findOne({where: {email: value}})
                                                   .then(user => {if(user){return Promise.reject('El email ya fue registrado')}})}),
           body('password')
                           .notEmpty()
                           .withMessage('Ingresa tu contraseña')
                           .bail()
                           .isLength({min: 8})
                           .withMessage('La contraseña debe tener un mínimo de 8 caracteres')
                           .custom((value, {req}) => {let password = req.body.password;
        
                                                      mayusculas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                                                      minusculas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
                                                      numeros = [1,2,3,4,5,6,7,8,9,10]
                                                      caracteresEspeciales = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])/
        
                                                      if(!password){throw new Error('Tienes que digital tu contraseña')} 
                                                      else {let contadorMayuscula = 0;
                                                            let contadorMinusculas = 0;
                                                            let contadorNumeros = 0;
                                                            let caracteresEspeciales = 0;
        
                                                            for(let i = 0; i < password.length; i++) 
                                                            {
                                                                if(mayusculas.includes(password[i]))
                                                                {contadorMayuscula += 1;
                                                                 continue;} 
                                                                else if(minusculas.includes(password[i]))
                                                                {contadorMinusculas += 1;
                                                                 continue;} 
                                                                else if(numeros.includes(password[i]))
                                                                {contadorNumeros += 1;
                                                                 continue;} 
                                                                else {caracteresEspeciales += 1;}
                                                            }
                
                                                      if(contadorMayuscula >= 1 && contadorMinusculas >= 1 && contadorNumeros >= 0 && caracteresEspeciales >= 1)
                                                      {return true} 
                                                      else {if(contadorMayuscula == 0)
                                                               throw new Error('Tu contraseña debe contener al menos una letra mayúscula');
                                                            if(contadorMinusculas == 0)
                                                               throw new Error('Tu contraseña debe contener al menos una letra minúscula');
                                                            if(contadorNumeros == 0)
                                                               throw new Error('Tu contraseña debe contener al menos un número');
                                                            if(caracteresEspeciales == 0)
                                                               throw new Error('Tu contraseña debe contener al menos un caracter especial');}
                                                      }}),
           body('validationPassword')
                                     .notEmpty()
                                     .withMessage('Vuelve a ingresar tu contraseña')
                                     .custom((value, {req}) => {let password = req.body.password;
                                                                let validationPassword = req.body.validationPassword;
        
                                                                if(!password){throw new Error('Confirma tu contraseña');} 
                                                                else {for(let i = 0; i < password.length; i++)
                                                                      {
                                                                          if(password[i] == validationPassword[i]) {continue;}
                                                                          else {throw new Error('Las contraseñas ingresadas no coinciden');}
                                                                      }
                                                                      return true;}}),
           body('gender')
                         .notEmpty()
                         .withMessage('Selecciona un género')
                         .bail(),
           body('userRol')
                          .notEmpty()
                          .withMessage('Selecciona un rol')
                          .bail(),
          ],
    
// VALIDACIONES PARA LOS CAMPOS DEL INGRESO DE SESION     
    
login: [
        body('email')
                     .notEmpty()
                     .withMessage('Ingresa tu email')
                     .bail()
                     .isEmail()
                     .withMessage('El campo email debe tener una dirección de correo válida')
                     .bail()
                     .custom((value, {req}) => {return db.User.findOne({where: {email: value}})                                           
                                                              .then(user => {if(!user){return Promise.reject('Usuario inválido')}})}),
        body('password')
                        .notEmpty()
                        .withMessage('Ingresa tu contraseña')
                        .custom((value, {req}) => {return db.User.findOne({where: {email: req.body.email}})  
                                                                 .then(user => {if(!user)
                                                                                  {return Promise.reject('Usuario inválido')} 
                                                                                else if(!bcrypt.compareSync(req.body.password, user.password)) 
                                                                                  {return Promise.reject('La contraseña no corresponde al email ingresado')}})})
       ]
}

// EXPORTO EL MODULO

module.exports = validar;
