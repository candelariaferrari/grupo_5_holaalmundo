const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../database/models');
const userServices = require("../services/usersService");

const validar = {

  register: [
    check("name")
      .notEmpty()
      .withMessage("Ingresa tu nombre")
      .isLength({ min: 3 })
      .withMessage("El campo nombre debe tener un mínimo de 3 caracteres"),
    check("last_name")
      .notEmpty()
      .withMessage("Ingresa tu apellido")
      .isLength({ min: 3 })
      .withMessage("El campo apellido debe tener un mínimo de 3 caracteres"),
    check("phone")
      .notEmpty()
      .withMessage("Ingresa tu número de celular")
      .isNumeric({ no_symbols: true })
      .withMessage("El campo celular debe tener únicamente números"),
    check("email")
      .notEmpty()
      .withMessage("Ingresa tu email")
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: value
          }
        }).then(user => {
          if (user) {
            return Promise.reject("El email ya fue registrado")
          }
        })
      }),
    check("password")
      .notEmpty()
      .withMessage("Ingresa tu contraseña")
      .isLength({ min: 4 })
      .withMessage("La contraseña debe tener un mínimo de 8 caracteres")
      .custom((value, { req }) => {
        let password = req.body.password;

        mayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        minusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        caracteresEspeciales = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])/

        if (!password) {
          throw new Error("Complete el campo de la contraseña")
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
              throw new Error("Tu contraseña debe contener al menos una letra mayúscula")
            if (contadorMinusculas == 0)
              throw new Error("Tu contraseña debe contener al menos una letra minúscula")
            if (contadorNumeros == 0)
              throw new Error("Tu contraseña debe contener al menos un número")
            if (caracteresEspeciales == 0)
              throw new Error("Tu contraseña debe contener al menos un carácter especial")
          }
        }
      }),
    check("validationPassword")
      .notEmpty()
      .withMessage("Vuelve a ingresar tu contraseña")
      .custom((value, { req }) => {
        let password = req.body.password;

        let validationPassword = req.body.validationPassword;

        if (!password) {
          throw new Error("Confirma tu contraseña")
        } else {
          for (let i = 0; i < password.length; i++) {
            if (password[i] == validationPassword[i]) {
              continue;
            } else {
              throw new Error("Las contraseñas ingresadas no coinciden")
            }
          }
          return true;
        }
      }),
    check("gender")
      .notEmpty()
      .withMessage("Selecciona tu género"),
    check("userRol")
      .notEmpty()
      .withMessage("Selecciona tu rol"),
  ],

  login: [
    check("email")
      .notEmpty() 
      .withMessage("Ingresa tu email")
      .isEmail()
      .withMessage("El campo email debe tener una dirección de correo válida")
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: value
          }
        }).then(user => {
          if (!user) {
            return Promise.reject("El usuario no es válido")
          }
        })
      }),
    check("password")
      .notEmpty()
      .withMessage("Ingresa tu contraseña")
      .custom((value, { req }) => {

        return db.User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {

          if (!user) {
            return Promise.reject("El usuario no es válido")
          } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return Promise.reject("La contraseña no corresponde al email ingresado")
          }
        });
      })
  ],
 createPackages: [
    check("description")
      .notEmpty()
      .withMessage("Ingresa el nombre de tu paquete")
      .isLength({ max: 20 })
      .withMessage("El nombre no debe superar los 20 caracteres"),
    check("language")
      .notEmpty()
      .withMessage("Selecciona un idioma"),
    check("week_days")
      .notEmpty()
      .withMessage("Selecciona una combinación de días"),
    check("week_times")
      .notEmpty()
      .withMessage("Selecciona un horario"),
    check("level")
      .notEmpty()
      .withMessage("Selecciona un nivel"),
    check("topics")
      .notEmpty()
      .withMessage("Selecciona una temática"),
    check("types")
      .notEmpty()
      .withMessage("Selecciona una modalidad"),
    check("price")
      .notEmpty()
      .withMessage("Ingresa el precio de tu paquete")
      .isNumeric({ no_symbols: true })
      .withMessage("El campo precio no debe contener símbolos"),
    check("cap_max")
      .notEmpty()
      .withMessage("Ingresa una cantidad máxima de alumnos")
      .isNumeric({ no_symbols: true })
      .withMessage("El campo capacidad máxima no debe contener símbolos"),
    check("link_class")
      .notEmpty()
      .withMessage("Ingresa el link hacia una plataforma")
  ],
  configurationStudents: [
    check("name")
      .notEmpty()
      .withMessage("Ingresa tu nombre")
      .isLength({ min: 3 })
      .withMessage("El campo nombre debe tener un mínimo de 3 caracteres"),
    check("last_name")
      .notEmpty()
      .withMessage("Ingresa tu apellido")
      .isLength({ min: 3 })
      .withMessage("El campo apellido debe tener un mínimo de 3 caracteres"),
    check("phone")
      .notEmpty()
      .withMessage("Ingresa tu número de celular")
      .isNumeric({ no_symbols: true })
      .withMessage("El campo celular debe tener únicamente números"),
    check("avatar")
      .notEmpty()
      .withMessage("Carga una foto para tu perfil")
  ],
  configurationTeachers: [
    check("name")
      .notEmpty()
      .withMessage("Ingresa tu nombre")
      .isLength({ min: 3 })
      .withMessage("El campo nombre debe tener un mínimo de 3 caracteres"),
    check("last_name")
      .notEmpty()
      .withMessage("Ingresa tu apellido")
      .isLength({ min: 3 })
      .withMessage("El campo apellido debe tener un mínimo de 3 caracteres"),
    check("phone")
      .notEmpty()
      .withMessage("Ingresa tu número de celular")
      .isNumeric({ no_symbols: true })
      .withMessage("El campo celular debe tener únicamente números"),
    check("avatar")
      .notEmpty()
      .withMessage("Carga una foto para tu perfil")
  ]
}

module.exports = validar;