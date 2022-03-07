const {check, body, validationResult} = require("express-validator");
const fs = require("fs");
const path = require ("path");
const bcrypt = require("bcrypt");
const userServices = require("../services/usersService");

const validar = {

    register: [
        body('nombre')
            .notEmpty()
            .withMessage('Tines que ingresar el nombre')
            .bail()
            .isLength({min:3})
            .withMessage("Campo de nombre debe tener un minimo de 3 caracteres"),
        body('apellido')
            .notEmpty()
            .withMessage('Tines que ingresar el apellido')
            .bail()
            .isLength({min:3})
            .withMessage("Campo de apellido debe tener un minimo de 3 caracteres"),
        body('celular')
            .notEmpty()
            .withMessage('Tines que ingresar el celular')
            .bail()
            .isNumeric({no_symbols:true})
            .withMessage("Debes incluir exclusivamente números"),
        body('email')
            .notEmpty()
            .withMessage('Tines que ingresar un email')
            .bail()
            .custom((value, {req}) => {

                let emailValido = userServices.emailValidation(req);

                if(emailValido){
                    throw new Error('El email ya esta registrado');
                } else {
                    return true;
                }
            }),
        body('contrasenia')
            .notEmpty()
            .withMessage('Tines que ingresar la contraseña')
            .bail()
            .isLength({min: 4})
            .withMessage("La contraseña debe tener un minimo de 4 caracteres")
            .custom((value, {req}) => {
                let password = req.body.contrasenia;
        
                // let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
                mayusculas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                minusculas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
                numeros = [1,2,3,4,5,6,7,8,9,10]
                caracteresEspeciales = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])/
        
                if(!password){
                    throw new Error('Tienes que digital tu contraseña');
                } else {
                    let contadorMayuscula = 0;
                    let contadorMinusculas = 0;
                    let contadorNumeros = 0;
                    let caracteresEspeciales = 0;
        
                    for(let i = 0; i < password.length; i++){
                        if(mayusculas.includes(password[i])){
                            contadorMayuscula += 1;
                            continue;
                        } else if(minusculas.includes(password[i])){
                            contadorMinusculas += 1;
                            continue;
                        } else if(numeros.includes(password[i])){
                            contadorNumeros += 1;
                            continue;
                        } else {
                            caracteresEspeciales += 1;
                        }
                    }
                
                    if(contadorMayuscula >= 1 && contadorMinusculas >= 1 && contadorNumeros >= 0 && caracteresEspeciales >= 1){
                        return true;
                    } else {
                        if(contadorMayuscula == 0)
                            throw new Error('Debes ingresar minimo una letra Mayuscula');
                        if(contadorMinusculas == 0)
                            throw new Error('Debes ingresar minimo una letra Minuscula');
                        if(contadorNumeros == 0)
                            throw new Error('Debes ingresar minimo un numero');
                        if(caracteresEspeciales == 0)
                            throw new Error('Debes ingresar minimo un caracter especial');
                    }
                }
            }),
        body('validationContrasenia')
            .notEmpty()
            .withMessage('Tines que ingresar la misma contraseña')
            .custom((value, {req}) => {            
                let password = req.body.contrasenia;
                
                let validationPassword = req.body.validationContrasenia
        
                if(!password){
                    throw new Error('Tienes que confirmar tu contraseña');
                } else {
                    for(let i = 0; i < password.length; i++){
                        if(password[i] == validationPassword[i]){
                            continue;
                        } else {
                            throw new Error('Las contraseñas no son las mismas');
                        }
                    }
                    return true;
                }
            }),
        body('sexo')
            .notEmpty()
            .withMessage('Tines que ingresar el genero')
            .bail(),
        body('userRol')
            .notEmpty()
            .withMessage('Tines que ingresar un usuario')
            .bail(),
    ],

    login: [
        /** Se toma el campo de name del formulario */
        body('email')
            .notEmpty()
            .withMessage('Tines que ingresar el email')
            .bail()
            .isEmail()
            .withMessage("Email con formato incorrecto")
            .bail()
            .custom((value, {req}) => {

                let emailUser = userServices.emailValidation(req); 
              
                if(!emailUser.email){
                    throw new Error('Se debe ingresar un email registrado');
                } else {
                    return true; 
            }    
        }),
        body('contrasenia')
            .notEmpty()
            .withMessage('Tines que ingresar la contraseña')
            .custom((value, {req}) => {

                let user = userServices.emailValidation(req); 
                let password = req.body.contrasenia;
                let decodePassword = bcrypt.compareSync(password, user.contrasenia);

                if(!decodePassword){
                    throw new Error('Las credenciales no son validas');
                } else {
                    return user;
                }                          
            })
        ]
}

module.exports = validar;