const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../database/models');
const userServices = require("../services/usersService");

const validar = {

  register: [
    body('name')
      .notEmpty()
      .withMessage('Tines que ingresar el nombre')
      .bail()
      .isLength({ min: 3 })
      .withMessage("Campo de nombre debe tener un minimo de 3 caracteres"),
    body('last_name')
      .notEmpty()
      .withMessage('Tines que ingresar el apellido')
      .bail()
      .isLength({ min: 3 })
      .withMessage("Campo de apellido debe tener un minimo de 3 caracteres"),
    body('phone')
      .notEmpty()
      .withMessage('Tines que ingresar el celular')
      .bail()
      .isNumeric({ no_symbols: true })
      .withMessage("Debes incluir exclusivamente números"),
    body('email')
      .notEmpty()
      .withMessage('Tines que ingresar un email')
      .bail()
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: value
          }
        }).then(user => {
          if (user) {
            return Promise.reject("Email ya registrado!")
          }
        })
      }),
    body('password')
      .notEmpty()
      .withMessage('Tines que ingresar la contraseña')
      .bail()
      .isLength({ min: 4 })
      .withMessage("La contraseña debe tener un minimo de 4 caracteres")
      .custom((value, { req }) => {
        let password = req.body.password;

        // let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        caracteresEspeciales = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])/

        if (!password) {
          throw new Error('Tienes que digital tu contraseña');
        } else {
          let contadorMayuscula = 0;
          let contadorMinusculas = 0;
          let contadorNumeros = 0;
          let caracteresEspeciales = 0;

          for (let i = 0; i < password.length; i++) {
            if (mayusculas.includes(password[i])) {
              contadorMayuscula += 1;
              continue;
            } else if (minusculas.includes(password[i])) {
              contadorMinusculas += 1;
              continue;
            } else if (numeros.includes(password[i])) {
              contadorNumeros += 1;
              continue;
            } else {
              caracteresEspeciales += 1;
            }
          }

          if (contadorMayuscula >= 1 && contadorMinusculas >= 1 && contadorNumeros >= 0 && caracteresEspeciales >= 1) {
            return true;
          } else {
            if (contadorMayuscula == 0)
              throw new Error('Debes ingresar minimo una letra Mayuscula');
            if (contadorMinusculas == 0)
              throw new Error('Debes ingresar minimo una letra Minuscula');
            if (contadorNumeros == 0)
              throw new Error('Debes ingresar minimo un numero');
            if (caracteresEspeciales == 0)
              throw new Error('Debes ingresar minimo un caracter especial');
          }
        }
      }),
    body('validationPassword')
      .notEmpty()
      .withMessage('Tines que ingresar la misma contraseña')
      .custom((value, { req }) => {
        let password = req.body.password;

        let validationPassword = req.body.validationPassword;

        if (!password) {
          throw new Error('Tienes que confirmar tu contraseña');
        } else {
          for (let i = 0; i < password.length; i++) {
            if (password[i] == validationPassword[i]) {
              continue;
            } else {
              throw new Error('Las contraseñas no son las mismas');
            }
          }
          return true;
        }
      }),
    body('gender')
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
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: value
          }
        }).then(user => {
          if (!user) {
            return Promise.reject("Usuario invalido")
          }
        })
      }),
    body('password')
      .notEmpty()
      .withMessage('Tines que ingresar la contraseña')
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {

          if (!user) {
            return Promise.reject("Usuario invalido")
          } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return Promise.reject("La contraseña no corresponde al email ingresado")
          }
        });
      })
  ],
 createPackages: [
    check("description")
      .notEmpty()
      .withMessage("Debe colocar un nombre de paquete")
      .isLength({ max: 20 })
      .withMessage("campo nombre debe superar los 20 caracteres"),
    check('language')
      .notEmpty()
      .withMessage('Tines que seleccionar un idioma'),
    check('week_days')
      .notEmpty()
      .withMessage('Tines que seleccionar un grupo de dias'),
    check('week_times')
      .notEmpty()
      .withMessage('Tines que seleccionar un horario'),
    check('level')
      .notEmpty()
      .withMessage('Tines que seleccionar un nivel'),
    check('topics')
      .notEmpty()
      .withMessage('Tines que seleccionar una tematica'),
    check('types')
      .notEmpty()
      .withMessage('Tines que seleccionar el tipo de modalidad'),
    check("price")
      .notEmpty()
      .withMessage("Debe colocar un precio de paquete")
      .isNumeric({ no_symbols: true })
      .withMessage("campo nombre debe contener simbolos"),
    check("cap_max")
      .notEmpty()
      .withMessage("Debe colocar un precio de paquete")
      .isNumeric({ no_symbols: true })
      .withMessage("campo nombre debe contener simbolos"),
   
  ]
}

module.exports = validar;