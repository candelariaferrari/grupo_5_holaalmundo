window.addEventListener("load", function () 
{
let form = document.querySelector("form")
let email = document.getElementById("email")
let password = document.getElementById("password")

let errors = []
let ulErrors = document.querySelector("div.errores-form ul")
  
console.log(ulErrors + "llegue?")
  
form.addEventListener('submit', (e) => 
{
e.preventDefault()

if (email.value == '') 
{
console.log(email.value)
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