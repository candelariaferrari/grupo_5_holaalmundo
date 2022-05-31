window.addEventListener("load", function () 
{
let form = document.getElementById("config-students")
let name = document.getElementById("nameStudent")
let lastName = document.getElementById("last_nameStudent")
let phone = document.getElementById("phoneStudent")
  
let errors = []
let ulErrors = document.querySelector("div.errores-form ul")
  
console.log(ulErrors + "llegue?")
  
form.addEventListener("submit", (e) => 
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
errors.push("El campo Apellido no puede estar vacío")
lastName.classList.toggle("backgroundFocus")
} 
else {lastName.classList.remove("backgroundFocus")}

if (phone.value == '') 
{
errors.push("El campo Celular no puede estar vacío")
phone.classList.toggle("backgroundFocus")
} 
else {phone.classList.remove("backgroundFocus")}
  
/* --- errores --- */

if (errors.length > 0) 
{
e.preventDefault();
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

function imageValidation() {
    let image = document.getElementById("nuestroInputStudent")
    let imagePreview = document.getElementById("nuestroInputPreview")
    var filePath = image.value
    var allowedExtensions = /(.jpg|.jpeg|.png)$/i
   
    if(!allowedExtensions.exec(filePath)){
        alert("Suba un archivo con alguna de las siguientes extensiones: .jpg/.jpeg/.png")
        image.value = ''
        return false;
    }else{
        if (image.files && image.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = '<img src="'+e.target.result+'"/>';
            }
            reader.readAsDataURL(image.files[0]);
        }
    }
}
    