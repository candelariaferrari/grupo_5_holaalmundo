window.addEventListener("load", function () {

  let form = document.getElementById('crearPackage');
  let description = document.getElementById('descriptionPackage');
  let language = document.getElementById('#language');
  let week_days = document.querySelector('#week_days');
  let week_times = document.querySelector('#week_times');
  let level = document.querySelector('#level');
  let topics = document.querySelector('#topics');
  let types = document.querySelector('#types');
  let price = document.querySelector('#price');
  let cap_max = document.querySelector('#cap_max');
  let link_class = document.querySelector('#link_class');

  let errors = [];
  let ulErrors = document.querySelector('div.errores ul');

  console.log(ulErrors + "llegue?");

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("son las 3:300");

    if (description.value == '') {
      console.log(description.value);
      description.classList.toggle('backgroundFocus');
      errors.push('El campo género no puede estar vacío');
    } else {
      description.classList.remove('backgroundFocus')
    }
    if (errors.length > 0) {
      e.preventDefault();
      ulErrors.innerHTML = '';
      for (let i = 0; i < errors.length; i++) {
        ulErrors.innerHTML += `<li>${errors[i]}</li>`;
      };
    } else {
      alert('La validación fué exitosa')
      form.submit();
    }
    console.log(errors)
  })

})