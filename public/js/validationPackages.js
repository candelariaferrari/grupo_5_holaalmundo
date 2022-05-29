window.addEventListener('load', function () {
  let form = document.querySelector('#crearPackage');
  form.description.focus();
  form.addEventListener('submit', (e) => {
    let errors = [];
    let description = document.querySelector('#description');
    let language = document.querySelector('#language');
    let week_days = document.querySelector('#week_days');
    let week_times = document.querySelector('#week_times');
    let level = document.querySelector('#level');
    let topics = document.querySelector('#topics');
    let types = document.querySelector('#types');
    let price = document.querySelector('#price');
    let cap_max = document.querySelector('#cap_max');
    if (description.value == '') {
      errors.push('El campo titulo no puede estar vacío');
      description.classList.add('is-invalid');
    } else {
      description.classList.add('is-valid');
      description.classList.remove('is-invalid');
      form.language.focus();
    };
    if (language.value <= 0 && language.value > 10.0) {
      errors.push('El campo calificación no puede ser menor a cero ni mayor a 10');
      language.classList.add('is-invalid');
    } else {
      language.classList.add('is-valid');
      language.classList.remove('is-invalid');
      form.week_days.focus();
    };
    if (week_days.value <= 0 && week_days.value > 10) {
      errors.push('El campo premios no puede ser menor a cero ni mayor a 10');
      week_days.classList.add('is-invalid');
    } else {
      week_days.classList.add('is-valid');
      week_days.classList.remove('is-invalid');
      form.week_times.focus();
    };
    if (week_times.value == "") {
      errors.push('El campo fecha de creación no puede estar vacio');
      week_times.classList.add('is-invalid');
    } else {
      week_times.classList.add('is-valid');
      week_times.classList.remove('is-invalid');
      form.level.focus();
    };
    if (level.value < 60 || level.value > 360) {
      errors.push('El campo duración no puede ser menor a 60 ni mayor a 360 minutos');
      level.classList.add('is-invalid');
    } else {
      level.classList.add('is-valid');
      level.classList.remove('is-invalid');
      form.topics.focus();
    };
    if (topics.value == '') {
      errors.push('El campo género no puede estar vacío');
      topics.classList.add('is-invalid');
    } else {
      topics.classList.add('is-valid');
      topics.classList.remove('is-invalid');
      form.types.focus();
    };
    if (types.value == '') {
      errors.push('El campo género no puede estar vacío');
      types.classList.add('is-invalid');
    } else {
      types.classList.add('is-valid');
      types.classList.remove('is-invalid');
      form.price.focus();
    };
    if (price.value == '') {
      errors.push('El campo género no puede estar vacío');
      price.classList.add('is-invalid');
    } else {
      price.classList.add('is-valid');
      price.classList.remove('is-invalid');
      form.cap_max.focus();
    };
    if (cap_max.value == '') {
      errors.push('El campo género no puede estar vacío');
      cap_max.classList.add('is-invalid');
    } else {
      cap_max.classList.add('is-valid');
      cap_max.classList.remove('is-invalid');
    };
    if (errors.level > 0) {
      e.preventDefault();
      let ulErrors = document.querySelector('.errores');
      ulErrors.classList.add('alert-warning');
      ulErrors.innerHTML = '';
      for (let i = 0; i < errors.level; i++) {
        ulErrors.innerHTML += "<li >" + errors[i] +"</li>;"
      };
    } else {
      alert('La validación fué exitosa')
      form.submit();
    }

  })
})