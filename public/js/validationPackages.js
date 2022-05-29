window.addEventListener("load", function () {

  let form = document.getElementById('crearPackage');
  let description = document.getElementById('descriptionPackage');
  let language = document.getElementById('language');
  let week_days = document.getElementById('week_days');
  let week_times = document.getElementById('week_times');
  let level = document.getElementById('level');
  let topics = document.getElementById('topics');
  let types = document.getElementById('types');
  let price = document.getElementById('price');
  let cap_max = document.getElementById('cap_max');
  let link_class = document.getElementById('link_class');

  let errors = [];
  let ulErrors = document.querySelector('div.errores ul');

  console.log(ulErrors + "llegue?");

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (description.value == '') {
      console.log(description.value);
      description.classList.toggle('backgroundFocus');
      errors.push('El campo Nombre de producto no puede estar vacío');
    } else {
      description.classList.remove('backgroundFocus')
    }
    if (language.value == '') {
      errors.push('El campo Idioma no puede estar vacío');
      language.classList.toggle('backgroundFocus');
    } else {
      language.classList.remove('backgroundFocus')
    };

    if (week_days.value == '') {
      errors.push('El campo Dias de encuentro no puede estar vacío');
      week_days.classList.toggle('backgroundFocus');
    } else {
      week_days.classList.remove('backgroundFocus')
    };

    if (week_times.value == '') {
      errors.push('El campo Hora de encuentro no puede estar vacío');
      week_times.classList.toggle('backgroundFocus');
    } else {
      week_times.classList.remove('backgroundFocus')
    };

    if (level.value == '') {
      errors.push('El campo Nivel a enseñar no puede estar vacío');
      level.classList.toggle('backgroundFocus');
    } else {
      level.classList.remove('backgroundFocus')
    };

    if (topics.value == '') {
      errors.push('El campo Tematica de interes no puede estar vacío');
      topics.classList.toggle('backgroundFocus');
    } else {
      topics.classList.remove('backgroundFocus')
    };

    if (types.value == '') {
      errors.push('El campo Tipo de curso no puede estar vacío');
      types.classList.toggle('backgroundFocus');
    } else {
      types.classList.remove('backgroundFocus')
    };

    if (price.value == '') {
      errors.push('El campo Precio por hora no puede estar vacío');
      price.classList.toggle('backgroundFocus');
    } else {
      price.classList.remove('backgroundFocus')
    };

    if (cap_max.value == '') {
      errors.push('El campo Capacidad maxima no puede estar vacío');
      cap_max.classList.toggle('backgroundFocus');
    } else {
      cap_max.classList.remove('backgroundFocus')
    };

    if (link_class.value == '') {
      errors.push('El campo Linkd de plataforma no puede estar vacío');
      link_class.classList.toggle('backgroundFocus');
    } else {
      link_class.classList.remove('backgroundFocus')
    }; 
    
    /* --- errores --- */
    if (errors.length > 0) {
      e.preventDefault();
      ulErrors.innerHTML = "";
      for (let i = 0; i < errors.length; i++) {
        ulErrors.innerHTML += `<div>* <li> ${errors[i]}</li> </div>`;
      };
      errors = "";
    } else {
      ulErrors.innerHTML = "";
      alert('Su curso fue creado con éxito ! ')
      form.submit();
    }
    console.log(errors)
  })

})