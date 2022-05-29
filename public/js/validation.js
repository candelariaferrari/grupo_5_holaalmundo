window.onload = function(){
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
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
}