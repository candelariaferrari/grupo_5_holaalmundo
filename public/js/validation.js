window.onload = function()
{ 
  let name = document.getElementById("name")
  let lastName = document.getElementById("last_name")
  let phone = document.getElementById("phone")
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let validationPassword = document.getElementById("validationPassword")
  let gender = document.getElementById("gender")
  let userRol = document.getElementById("userRol")

  name.addEventListener("focus", function () {
    name.style.borderColor = "#6243f7;";
    name.style.borderWidth = "1px";
    name.style.borderStyle = "solid";
  })

  name.addEventListener("blur", function () {
    name.style.borderColor = "transparent";
    name.style.borderWidth = "1px";
    name.style.borderStyle = "solid";
  })

  lastName.addEventListener("focus", function () {
    lastName.style.borderColor = "#6243f7;";
    lastName.style.borderWidth = "1px";
    lastName.style.borderStyle = "solid";
  })

  lastName.addEventListener("blur", function () {
    lastName.style.borderColor = "transparent";
    lastName.style.borderWidth = "1px";
    lastName.style.borderStyle = "solid";
  })

  phone.addEventListener("focus", function () {
    phone.style.borderColor = "#6243f7;";
    phone.style.borderWidth = "1px";
    phone.style.borderStyle = "solid";
  })

  phone.addEventListener("blur", function () {
    phone.style.borderColor = "transparent";
    phone.style.borderWidth = "1px";
    phone.style.borderStyle = "solid";
  })

  email.addEventListener("focus", function () {
    email.style.borderColor = "#6243f7;";
    email.style.borderWidth = "1px";
    email.style.borderStyle = "solid";
  })

  email.addEventListener("blur", function () {
    email.style.borderColor = "transparent";
    email.style.borderWidth = "1px";
    email.style.borderStyle = "solid";
  })

  password.addEventListener("focus", function () {
    password.style.borderColor = "#6243f7;";
    password.style.borderWidth = "1px";
    password.style.borderStyle = "solid";
  })

  password.addEventListener("blur", function () {
    password.style.borderColor = "transparent";
    password.style.borderWidth = "1px";
    password.style.borderStyle = "solid";
  })

  validationPassword.addEventListener("focus", function () {
    validationPassword.style.borderColor = "#6243f7;";
    validationPassword.style.borderWidth = "1px";
    validationPassword.style.borderStyle = "solid";
  })

  validationPassword.addEventListener("blur", function () {
    validationPassword.style.borderColor = "transparent";
    validationPassword.style.borderWidth = "1px";
    validationPassword.style.borderStyle = "solid";
  })

  gender.addEventListener("focus", function () {
    gender.style.borderColor = "#6243f7;";
    gender.style.borderWidth = "1px";
    gender.style.borderStyle = "solid";
  })

  gender.addEventListener("blur", function () {
    gender.style.borderColor = "transparent";
    gender.style.borderWidth = "1px";
    gender.style.borderStyle = "solid";
  })

  userRol.addEventListener("focus", function () {
    userRol.style.borderColor = "#6243f7;";
    userRol.style.borderWidth = "1px";
    userRol.style.borderStyle = "solid";
  })

  userRol.addEventListener("blur", function () {
    userRol.style.borderColor = "transparent";
    userRol.style.borderWidth = "1px";
    userRol.style.borderStyle = "solid";
  })
}