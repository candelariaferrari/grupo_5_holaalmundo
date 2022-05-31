window.addEventListener("load", function () 
{
let form = document.querySelector("form")
let name = document.getElementById("name")
let lastName = document.getElementById("last_name")
let phone = document.getElementById("phone")
let email = document.getElementById("email")
let password = document.getElementById("password")
let validationPassword = document.getElementById("validationPassword")
let gender = document.getElementById("gender")
let userRol = document.getElementById("userRol")

let errors = []
let ulErrors = document.querySelector("div.errores-form ul")
  
console.log(ulErrors + "llegue?")
  
form.addEventListener('submit', (e) => 
{
e.preventDefault()

if (name.value == '') 
{
console.log(name.value)
name.classList.toggle("backgroundFocus")
errors.push("El campo Nombre no puede estar vacío")
} 
else {name.classList.remove("backgroundFocus")}

if (lastName.value == '') 
{
lastName.classList.toggle("backgroundFocus")
errors.push("El campo Apellido no puede estar vacío")
} 
else {lastName.classList.remove("backgroundFocus")}

if (phone.value == '') 
{
phone.classList.toggle("backgroundFocus")
errors.push("El campo Celular no puede estar vacío")
} 
else {phone.classList.remove("backgroundFocus")}

if (email.value == '') 
{
email.classList.toggle("backgroundFocus")
errors.push("El campo Email no puede estar vacío")
} 
else {email.classList.remove("backgroundFocus")}

if (password.value == '') 
{
errors.push("El campo Contraseña no puede estar vacío")
password.classList.toggle("backgroundFocus")
} 
else {password.classList.remove("backgroundFocus")}

if (validationPassword.value == '') 
{
errors.push("El campo Confirmar Contraseña no puede estar vacío")
validationPassword.classList.toggle("backgroundFocus")
} 
else {validationPassword.classList.remove("backgroundFocus")}

if (gender.value == '') 
{
errors.push("El campo Género no puede estar vacío")
gender.classList.toggle("backgroundFocus")
} 
else {gender.classList.remove("backgroundFocus")}

if (userRol.value == '') 
{
errors.push("El campo Rol no puede estar vacío")
userRol.classList.toggle("backgroundFocus")
} 
else {userRol.classList.remove("backgroundFocus")}
  
/* --- errores --- */

if (errors.length > 0) 
{
e.preventDefault()

ulErrors.innerHTML = ""

for (let i = 0; i < errors.length; i++) 
{
ulErrors.innerHTML += `<div>* <li> ${errors[i]} </li> </div>`
}

errors = ""
} 
else 
{
ulErrors.innerHTML = ""
form.submit()
}
console.log(errors)
})

})