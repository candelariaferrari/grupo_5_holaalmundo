/* --- carrusel servicios ----- */
const serviceContainers = [...document.querySelectorAll('.serviceContainer')];// para que tome todos los servicios dentro de esa etiqueta
const nxtBtn = document.getElementsByClassName('nxtBtn');
const preBtn = document.getElementsByClassName('preBtn');

serviceContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })
  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
})





